<?php

namespace Cobalt;

class Subscribe
{

  public function processSubscribeForm($form) {
    if ($errors = $this->checkFormForErrors($form)) {
      return array('error' => $errors);
    }

    $data = ['name' => $form['name'], 'email' => $form['email']];

    $return = $this->subscribeEmail($data);

    return $return;
  }

  protected function checkFormForErrors($form) {
    $errors = [];

    if ($form['name'] == '') {
      $errors['name'] = 'Please enter your name';
    } elseif (strlen($form['name']) < 2) {
      $errors['name'] = 'Please enter your valid name';
    }

    if (!filter_var($form['email'], FILTER_VALIDATE_EMAIL)) {
      $errors['email'] = 'Enter a valid email address';
    }

    if ($form['website'] != '') {
      $errors['website'] = '';
    }

    if ($errors) {
      return $errors;
    }
  }

  public function subscribeEmail($data) {
    $listid = 'b6637e7482';
    $apikey = '195c68cc05dfb0c4b1816665fbf65c97-us3';
    $auth = base64_encode( 'user:'.$apikey );

    $data = array(
      'email_address' => $data['email'],
      'status'        => 'subscribed',
      'merge_fields'  => array(
          'FNAME' => $data['name'],
          'TOUCHPOINT' => 'bickfordandsons',
      ),
      'interests' => array( 'b3523f6363' => true)// 'b29e5efc88' = alc
    );
    $json_data = json_encode($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_URL, 'https://us3.api.mailchimp.com/3.0/lists/'.$listid.'/members/'.md5($data['email_address']));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Basic '.$auth));
    curl_setopt($ch, CURLOPT_USERAGENT, 'PHP-MCAPI/2.0');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);

    $result = curl_exec($ch);
    $decode = json_decode($result);

    if (isset($decode->status) && $decode->status == "subscribed" || isset($decode->title) && $decode->title == "Member Exists"){
      $return = array("success"=>"success", "message" => "Thankyou, you've been added to our email list.");
      return $return;
    }
    if (isset($decode->detail)){ // if error
      $return = array('error' => array('general' => $decode->detail));
      return $return;
    } else {
      $return = array('error' => array('general' => "Sorry, there has been an error."));
      return $return;
    }
  }
}
