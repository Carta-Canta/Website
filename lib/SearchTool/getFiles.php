<?php
    $path="../../html/articoli"; // percorso degli articoli
    $results=[]; // array risultati che conterrà i percorsi dei file
    $k=0;
    $files=array_diff(scandir($path), array('..', '.')); //ottengo i file dalla root 
    foreach($files as $file){
        if($file!="index.html"){
            $results[$k]=$path."/".$file;
            $k++;
        }
    }
    echo(json_encode($results)); //restituisco l'array dei risultati nel formato JSON
    exit;
?>