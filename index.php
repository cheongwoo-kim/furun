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
                <h1>운동 명칭 : <span class="e_name"></span></h1>
                <article>
                    <p>운동 부위 : <span class="e_point"></span></p>
                    <p>운동 설명 : <span class="e_desc"></span></p>
                    <div class="position-relative text-center">
                        <article class="loading d-none"><p>로드중입니다.</p></article>
                        <video id="video" width="640" height="480" autoplay muted playsinline></video>
                        <canvas id="canvas"></canvas>
                        
                    </div>
                    
                    
                </article>
                <!-- <article class="ready">
                    <h2>준비</h2>
                    <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span>
                </article>
                <article class="set">
                    <h2>실행중</h2>
                    <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span>
                </article> -->
                <article class="go">
                    <!-- <h2>실행</h2> -->
                    <span>key : <span class="key"></span></span>
                    <span>a : <span class="a"></span></span>
                    <span>b1 : <span class="b1"></span></span>
                    <span>b2 : <span class="b2"></span></span>
                    <span>c : <span class="c"></span></span>
                    <span>d : <span class="d"></span></span>
                    <span>e : <span class="e"></span></span>
                </article>
                <button id="arnold">아놀드프레스</button>
                <!-- <button id="s_shoulder">시티드 숄더프레스</button> -->

            </section>
        </main>
        <script src="Jquery.js"></script>
        <script src="index.js"></script>
    </body>
</html>