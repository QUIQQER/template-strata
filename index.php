<?php


/**
 * Emotion
 */

\QUI\Utils\Site::setRecursivAttribute($Site, 'image_emotion');

/**
 * Project Logo
 */
$logo = false;
$configLogo = $Project->getConfig('templateQUI.settings.logo');

if (QUI\Projects\Media\Utils::isMediaUrl($configLogo)) {
    $logo = $configLogo;
}

/**
 * own site type?
 */

$Engine->assign(array(
    'logo'          => $logo,
    'ownSideType'   =>
        strpos($Site->getAttribute('type'), 'quiqqer/template-strata:') !== false
            ? 1 : 0,
    'quiTplType'    => $Project->getConfig('templateQUI.settings.standardType'),
    'BricksManager' => \QUI\Bricks\Manager::init()
));
