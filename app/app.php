<?php

require_once __DIR__.'/../vendor/autoload.php';
use Herrera\Silex\ActiveLinkServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\FormServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;
use Cobalt\Contact;
use Cobalt\Subscribe;
use Cobalt\Foodland;

$app = new Silex\Application();
$app['current_url'] = "http://".$_SERVER['HTTP_HOST'];

$app['debug'] = false;//////////////////////////////////////////////////////////////////////

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app->register(new TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../views',
));
$app->register(
    new ActiveLinkServiceProvider()
);

$app->register(new Silex\Provider\ValidatorServiceProvider());

$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'translator.domains' => array(),
));

$app->register(new FormServiceProvider());

$app->get('/', function() use($app) {
    return $app['twig']->render('pages/index.twig');
})->bind('index');
$app->post('/contact', function(Request $request) use($app) {
    $formValues = $request->request->all();
    $contactForm = new Contact("Bickford and Sons", "no-reply@bickfordandsons.com.au", "info@bickfords.net", "http://www.bickfordandsons.com.au");
    $return = $contactForm->processContactForm($formValues);
    return $app->json($return);
});
$app->post('/subscribe', function(Request $request) use($app) {
    $formValues = $request->request->all();
    $subscribeForm = new Subscribe();
    $return = $subscribeForm->processSubscribeForm($formValues);
    return $app->json($return);
});

// $app->get('/movers-and-shakers', function() use($app) {
//     return $app['twig']->render('pages/movers-and-shakers.twig');
// })->bind('movers-and-shakers');


$app->get('/terms-conditions', function() use($app) {
    return $app['twig']->render('pages/terms-conditions.twig');
})->bind('terms-conditions');

$app->get('/privacy-statement', function() use($app) {
    return $app['twig']->render('pages/privacy-statement.twig');
})->bind('privacy-statement');

$app->get('/foodland', function() use($app) {
    return $app['twig']->render('pages/foodland.twig');
})->bind('foodland');
$app->post('/foodland', function(Request $request) use($app) {
    $formValues = $request->request->all();
    $foodlandForm = new Foodland();
    $return = $foodlandForm->processfoodlandForm($app, $formValues);
    return $app->json($return);
});

$app->error(function (\Exception $e, $code) use($app) {
    switch ($code) {
        case 404:
            $message = $app['twig']->render('pages/404.twig');
            break;
        default:
            $message = $app['twig']->render('pages/500.twig');
    }
    return new Response($message, $code);
});

return $app;
