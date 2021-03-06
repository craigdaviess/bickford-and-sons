<?php

namespace Cobalt;
use Cobalt\Subscribe;

class Contact
{
    protected $webtitle;
    protected $noreply;
    protected $webmail;
    protected $fullweb;
    public function __construct($webtitle, $noreply, $webmail, $fullweb) { //$this->webtitle
      $this->webtitle = $webtitle;
      $this->noreply = $noreply;
      $this->webmail = $webmail;
      $this->fullweb = $fullweb;
    }

    public function processContactForm($form) {

      if ($errors = $this->checkFormForErrors($form)) {
        return array('error' => $errors);
      }

      $subcheck = isset($form['subcheck']) ? $form['subcheck']:0;

      $builtEmail = $this->buildEmail($form);
      $data = ['name' => $form['name'], 'enquiry-type' => $form['enquiry-type'], 'email' => $form['email'], 'subcheck' => $subcheck, 'message' => $builtEmail];

      $return = $this->sendContactEmail($data);

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

      if ($form['postcode'] == '') {
        $errors['postcode'] = 'Please enter your postcode';
      }

      if ($form['message'] == '') {
        $errors['message'] = 'Please enter your message';
      } elseif (strlen($form['message']) < 10) {
        $errors['message'] = 'Please enter your valid message';
      }

      if ($form['phone'] == '') {
        $errors['phone'] = 'Please enter your phone number';
      }

      if ($form['product'] == '' && $form['enquiry-type'] == "Product Feedback") {
        $errors['product'] = 'Please enter the product';
      }

      if ($form['enquiry-type'] == 'Product Feedback') {
        if ($form['street'] == '') {
          $errors['street'] = 'Please enter your street address';
        }
        if ($form['suburb'] == '') {
          $errors['suburb'] = 'Please enter your suburb';
        }
        if ($form['state'] == '') {
          $errors['state'] = 'Please enter your state';
        }
      }

      if ($form['website'] != '') {
        $errors['website'] = '';
      }

      if ($errors) {
        return $errors;
      }
    }

    public function buildEmail($form) {
      if ($form['enquiry-type'] == "General Enquiry") {
        $body = "<table><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Name:</td><td>" . $form['name'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Email:</td><td>" . $form['email'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Phone:</td><td>" . $form['phone'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Postcode:</td><td>" . $form['postcode'] . "</td></tr></table><hr /><p style='font-size:16px;'>" . $form['message'] . "</p><hr />";
      } else if ($form['enquiry-type'] == "Product Feedback") {
        $body = "<table><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Product:</td><td>" . $form['product'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Name:</td><td>" . $form['name'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Email:</td><td>" . $form['email'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Phone:</td><td>" . $form['phone'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Postcode:</td><td>" . $form['postcode'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Address:</td><td>" . $form['street'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Suburb:</td><td>" . $form['suburb'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>State:</td><td>" . $form['state'] . "</td></tr></table><hr /><p style='font-size:16px;'>" . $form['message'] . "</p><hr />";
      } else {
        $body = "<table><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Name:</td><td>" . $form['name'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Email:</td><td>" . $form['email'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Phone:</td><td>" . $form['phone'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Postcode:</td><td>" . $form['postcode'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Company:</td><td>" . $form['company'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Address:</td><td>" . $form['street'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>Suburb:</td><td>" . $form['suburb'] . "</td></tr><tr><td style='width:100px; font-weight:bold; font-size:14px;'>State:</td><td>" . $form['state'] . "</td></tr></table><hr /><p style='font-size:16px;'>" . $form['message'] . "</p><hr />";
      }
      return $body;
    }

    public function sendContactEmail($data) {


      $mail = new \PHPMailer();

      $mail->setFrom($this->noreply, $this->webtitle);
      //Set an alternative reply-to address
      $mail->addReplyTo($this->noreply, $this->webtitle);
      //Set who the message is to be sent to
      $mail->addAddress($this->webmail); //$this->webmail
      //Set email format to HTML
      $mail->isHTML(true);
      //Set the subject line
      $mail->Subject = $data['enquiry-type'];
      //This is the HTML message body
      $mail->Body = $data['message'];
      //This is the body in plain text for non-HTML mail clients
      $mail->AltBody = 'You need to view this email in HTML';

      $confirmmail = new \PHPMailer();

      $confirmmail->setFrom($this->noreply, $this->webtitle);
      //Set an alternative reply-to address
      $confirmmail->addReplyTo($this->noreply, $this->webtitle);
      //Set who the message is to be sent to
      $confirmmail->addAddress($data['email']);
      //Set email format to HTML
      $confirmmail->isHTML(true);
      //Set the subject line
      $confirmmail->Subject = $this->webtitle . " Enquiry";
      //This is the HTML message body
      $confirmmail->Body = "<table align='center' border='0' width='800' style='display: block;'><tr><td align='center' style='height: 100px;'><img style='margin: 0 auto; display: block; width: 360px; text-align: center;' src='" . $this->fullweb . "/images/logo-email.jpg'></td></tr><tr style='padding: 0 40px 40px 40px; display: block;'><td style='background: #FFF; padding: 20px;'><p style='font-size:22px; color: #000;'>Thanks for dropping us a line, " . $data['name'] . "! While we will attempt to respond to all inquiries, due to high volumes of requests at certain times, we may not be able to respond to every message left.</p><br><p style='font-size:14px; color: #000;'>This is an automated message.</p><br></td></tr></table>";
      //This is the body in plain text for non-HTML mail clients
      $confirmmail->AltBody = 'You need to view this email in HTML';


/// REMOVE THIS WHEN GOING LIVE, USING FOR TESTING! ////////////
// $return = array('success'=>'success', 'email' => $data['email']);
// return $return;
/// REMOVE THIS WHEN GOING LIVE, USING FOR TESTING! ////////////

      //send the message, check for errors
      if (!$mail->send()) {
        //$return = json_encode(array('error' => array('general' => $mail->ErrorInfo)));
        $return = array('error' => array('general' => $mail->ErrorInfo));
      } else if (!$confirmmail->send()) {
        //$return = json_encode(array('error' => array('general' => $mail->ErrorInfo)));
        $return = array('error' => array('general' => $confirmmail->ErrorInfo));
      } else {
        //$return = new Response(json_encode(array('success'=>'success', 'email' => $data['email'])));

        if ($data['subcheck']) {
          $subscribeForm = new Subscribe();
          $subCall = $subscribeForm->subscribeEmail($data);
        }

        $return = array('success'=>'success', 'email' => $data['email']);
      }

        return $return;
    }

}
