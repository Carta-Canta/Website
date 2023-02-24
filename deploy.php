<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */
     
    /**
    * Request URL: https://cartacanta.whixonio.net/deploy.php
    * Request method: POST
    * Accept:
*content-type: application/x-www-form-urlencoded
*User-Agent: GitHub-Hookshot/3e3b786
*X-GitHub-Delivery: 26513fd2-b455-11ed-8ce5-426781ecab80
*X-GitHub-Event: push
*X-GitHub-Hook-ID: 402367875
*X-GitHub-Hook-Installation-Target-ID: 580043958
*X-GitHub-Hook-Installation-Target-Type: repository
*X-Hub-Signature: sha1=da73b3c7e5662e23b29b25d25858f0519a926235
*X-Hub-Signature-256: sha256=a7358a889ea657584bdc6afdded234ef3fb19f87f4e7ac0d7acac65dcf54c6c0
     * 
     */



    // Verify the signature of the request to ensure it's from GitHub and not someone else
    $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'];

    $algo = sha256;

    // Use HMAC SHA256 to verify the signature with the secret as a ENV variable
    $hash = hash_hmac('sha256', file_get_contents('php://input'), getenv('GIT-SECRET'), true);

    // Split signature into algorithm and hash
    list($algo, $hash) = explode('=', $signature, 2);

    // array of commands
    $commands = array(
        'echo $PWD',
        'whoami',
        'git pull',
        'git status',
        'git submodule sync',
        'git submodule update',
        'git submodule status',
    );

    // exec commands
    $output = '';
    if ($hash === $signature) {
        $output .= "<span style=\"color: #4E9A06;\">✓</span> GitHub signature verified...<br /><br />";
        foreach($commands AS $command){
            $tmp = shell_exec($command);
            
            $output .= "<span style=\"color: #6BE234;\">\$</span><span style=\"color: #729FCF;\">{$command}\n</span><br />";
            $output .= htmlentities(trim($tmp)) . "\n<br /><br />";
        }
    } else {
        $output .= "<span style=\"color: #CC0000;\">✗</span> GitHub signature NOT verified...<br /><br />";
    }
?>

<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>GIT DEPLOYMENT SCRIPT</title>
</head>
<body style="background-color: #000000; color: #FFFFFF; font-weight: bold; padding: 0 10px;">
<div style="width:700px">
    <div style="float:left;width:350px;">
    <p style="color:white;">Git Deployment Script</p>
    <?php echo $output; ?>
    </div>
</div>
</body>
</html>
