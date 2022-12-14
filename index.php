<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            main{
                text-align: center;
            }
             canvas {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            } 
            .loading{
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
                width: 640px;
                height: 480px;
                color: #fff;
                background: rgba(0, 0, 0, .5);
                z-index: 5555;
            }
            .loading p {
                display: flex;
                align-items: center;
                flex: 1;
                place-content: center;
                height: 100%;
                margin-bottom: 0px;
            }
            .select{
                gap: 12px;
            }
        </style>
        <title>Title</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@2.2.2/dist/posenet.min.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@3.11.0/dist/tf-converter.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@0.0.6/dist/pose-detection.min.js"></script>

    </head>
    <body>
        <main>
            <section class="main_section">
                <article class="top">
                    <h1>?????? ?????? : <span class="e_name"></span></h1>
                
                    <p>?????? ?????? : <span class="e_point"></span></p>
                    <p>?????? ?????? : <span class="e_desc"></span></p>
                    
                    
                    
                </article>
                <?php if ($_GET['name']) :?>
                    <div class="position-relative text-center frame">
                        <article class="loading d-none"><p>??????????????????.</p></article>
                        <video id="video" width="640" height="480" autoplay muted playsinline></video>
                        <canvas id="canvas"></canvas>
                            
                    </div>
                <?php endif;?>
                <!-- <article class="ready">
                    <h2>??????</h2>
                    <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span>
                </article>
                <article class="set">
                    <h2>?????????</h2>
                    <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span>
                </article> -->
                <article class="go">
                    <!-- <h2>??????</h2> -->
                    <!-- <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b : <span class="b"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span> -->
                </article>
                <h3 class="mt-4">?????? ??????</h3>
                <div class="d-flex flex-column select w-50 mx-auto my-5" >
                <?php 
                    $folderName = './json'; 
                    // ??????????????? ????????? ??????
                    if (is_dir($folderName)) {
                        // ???????????? ??????
                        $open = opendir($folderName);
                        if($open) {
                            // ???????????? ????????? ?????? ?????? ????????????
                            while(($read = readdir($open))) {
                                if($read != '.' && $read != '..'){
                                    $url = "location.href='./?name=$read'";
                                    $name = str_replace("_", " ", $read);
                                    echo "<button class='btn btn-primary' onclick=$url id='$read'>$name</button>" ;
                                }
                                
                            } 
                        }
                    }
                ?>
                </div>
            </section>
        </main>
        <script src="Jquery.js"></script>
        <script src="index.js"></script>
    </body>
</html>