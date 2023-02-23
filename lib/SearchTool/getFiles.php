<?php
    $path="../../html/articoli"; // percorso degli articoli
    $dirs = glob($path . '/*' , GLOB_ONLYDIR); //ottengo le sottodirectory dalla path (array associativo )
    $arraySize=count($dirs); // ottengo la dimensione dell'array associativo delle sottodirectory
    $results=[]; // array risultati che conterrà i percorsi dei file
    $k=0;
    $files=array_diff(scandir($path), array('..', '.')); //ottengo i file dalla root 
    foreach($files as $file){
        if($file!="index.html"){
            $results[$k]=$path."/".$file;
            $k++;
        }
    }
    for($i=0; $i<$arraySize; $i++){
        $files=array_diff(scandir($dirs[$i]), array('..', '.')); //ottengo i file dalle sottodirectory 
        foreach($files as $file){ //per ogni file, salvo nell'array dei risultati il percorso del file
            $results[$k]=$dirs[$i]."/".$file;
            $k++;
        }
    }
    echo(json_encode($results)); //restituisco l'array dei risultati nel formato JSON
    exit;
?>