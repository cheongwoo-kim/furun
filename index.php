<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            /* 이미지에 캔버스를 겹쳐서 그리기 위함 */
            canvas {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }

            video {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }
        </style>
        <title>Title</title>

        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet@2.2.2/dist/posenet.min.js"></script>

        <!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@3.11.0/dist/tf-core.min.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@3.11.0/dist/tf-converter.min.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@3.11.0/dist/tf-backend-webgl.min.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@0.0.6/dist/pose-detection.min.js"></script>

    </head>
    <body>
        <main>
            <section class="main_section">
                <h1>운동 명칭 : </h1>
                <article>
                    <p class="e_point">운동 부위 : </p>
                    <span class="desc">운동 설명 : </span>
                    <video id="video" width="960" height="540" autoplay muted playsinline></video>
                    <canvas id="canvas"></canvas>
                    <span class="status"></span>
                    <button id="arnold">아놀드프레스</button>
                </article>
            </section>
        </main>
        
        <script src="Jquery.js"></script>
        <script src="index.js"></script>
    </body>
</html>