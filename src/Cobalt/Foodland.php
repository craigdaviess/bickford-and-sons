<?php

namespace Cobalt;

class Foodland
{

  public function processFoodlandForm($app, $form) {

    if ($errors = $this->checkFormForErrors($form)) {
      return array('error' => $errors);
    }

    $favouriteflavour = "-";
    if(isset($form['fav'])){
      $favouriteflavour = $form['fav'];
    }

    $sweetness = "-";
    if(isset($form['sweet'])){
      $sweetness = $form['sweet'];
    }

    $data = ['name' => $form['name'], 'email' => $form['email'], 'phone' => $form['phone'], 'place' => $form['place'], 'date' => $form['date'], 'fav' => $favouriteflavour, 'sweet' => $sweetness];

    $return = $this->foodlandData($app, $data);

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

    if ($form['phone'] == '') {
      $errors['phone'] = 'Please enter your phone number';
    }

    if ($form['place'] == '') {
      $errors['place'] = 'Please enter your place of purchase';
    }

    if ($form['date'] == '') {
      $errors['date'] = 'Please enter your date of purchase';
    }

    if (!isset($form['agree'])) {
      $errors['agree'] = 'You must agree to the terms and conditions';
    }


    if ($form['website'] != '') {
      $errors['website'] = '';
    }

    if ($errors) {
      return $errors;
    }
  }

  public function foodlandData($app, $data) {

    date_default_timezone_set("Australia/Adelaide");

    $app->register(new \Silex\Provider\DoctrineServiceProvider(), array(
      'db.options' => array(
        'driver'   => 'pdo_sqlite',
        'path'     => __DIR__.'/foodland.sqlite',
      ),
    ));


    $values = array(
      ':name' => $data['name'],
      ':email' => $data['email'],
      ':phone' => $data['phone'],
      ':place_purchased' => $data['place'],
      ':date_purchased' => $data['date'],
      ':favouriteflavour' => $data['fav'],
      ':sweetness' => $data['sweet'],
      ':the_timestamp' => date('Y-m-d-G-i'),
    );
    $insert = "INSERT INTO entries (name, email, phone, place_purchased, date_purchased, favouriteflavour, sweetness, the_timestamp) VALUES (:name, :email, :phone, :place_purchased, :date_purchased, :favouriteflavour, :sweetness, :the_timestamp)";
    try {
      $app['db']->executeUpdate($insert, $values);
    } catch(Exception $e) {
      return array('error'=>array('general'=>'Server error'));
    }


    $return = array('success'=>'success');
    return $return;


  }



}
