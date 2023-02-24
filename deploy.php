<?php
    /**
     * GIT DEPLOYMENT SCRIPT
     *
     * Used for automatically deploying websites via GitHub
     *
     */

    // Verify the signature of the request to ensure it's from GitHub and not someone else
    $signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

    $algo = sha1;

    // Use HMAC SHA256 to verify the signature with the secret as a ENV variable
    $hash = hash_hmac($algo, file_get_contents('php://input'), getenv('GIT-SECRET'), true);

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
