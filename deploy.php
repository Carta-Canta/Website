<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */

     $payload = file_get_contents('php://input');
     $secret = getenv('GIT_SECRET');
     $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'];
     
     if (!$signature) {
         // The signature header is missing, so we can't verify the request
         http_response_code(400);
         die('Invalid request: signature header missing');
     }
     
     list($hashAlgorithm, $hash) = explode('=', $signature, 2);
     
     if ($hashAlgorithm !== 'sha256') {
         // We only support sha256 for the hash algorithm
         http_response_code(400);
         die('Invalid request: unsupported hash algorithm');
     }
     
     $computedHash = hash_hmac('sha256', $payload, $secret, true);
     
     if (!hash_equals($hash, bin2hex($computedHash))) {
         // The computed hash doesn't match the received hash, so the request is not valid
         http_response_code(403);
         die('Invalid request: signature verification failed');
     }

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
    if (hash_equals($hash, bin2hex($computedHash))) {
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