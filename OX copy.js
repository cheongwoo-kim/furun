

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let pose_status = 2;
let keep_time = [0, 0, 0];
let result_message = "";
//webcam을 enable하는 코드
navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
    video.srcObject = stream;
});

posenet.load().then((model) => {
    // 이곳의 model과 아래 predict의 model은 같아야 한다.
    video.onloadeddata = (e) => {
        //비디오가 load된 다음에 predict하도록. (안하면 콘솔에 에러뜸)
        predict();
    };

    function predict() {
        //frame이 들어올 때마다 estimate를 해야하니 함수화 시킴
        model.estimateSinglePose(video).then((pose) => {
            canvas.width = video.width; //캔버스와 비디오의 크기를 일치시킴
            canvas.height = video.height;
            drawKeypoints(pose.keypoints, 0.6, context);
            drawSkeleton(pose.keypoints, 0.6, context);

            check_OX(pose);
        });
        requestAnimationFrame(predict); //frame이 들어올 때마다 재귀호출
    }
});
/* Timer */
let count_time = setInterval(function () {
    if (keep_time[pose_status] == 0) {
        //다른 모션에서 바뀌어 들어옴
        keep_time[0] = keep_time[1] = keep_time[2] = 0;
        keep_time[pose_status]++;
    } else {
        if (pose_status == 0)
            window.parent.postMessage({message: `O를 ${keep_time[pose_status]}초 유지하셨습니다.`}, "*");
        else if (pose_status == 1)
            window.parent.postMessage({message: `X를 ${keep_time[pose_status]}초 유지하셨습니다.`}, "*");
        else if (pose_status == 2) window.parent.postMessage({message: `포즈를 취해주세요.`}, "*");

        if (pose_status != 2 && keep_time[pose_status] == 5) {
            if (pose_status == 0) {
                result_message = "O";
            } else {
                result_message = "X";
            }
            clearInterval(count_time);
            window.parent.postMessage({message: result_message}, "*");
        }
        keep_time[pose_status]++; //시간은 항상 세고 있다.
    }
}, 1000);

/* 자세 검출 함수들 */
function check_OX(pose) {
    if (!check_O(pose) && !check_X(pose)) {
        pose_status = 2;
    } else if (check_O(pose)) {
        pose_status = 0;
    } else if (check_X(pose)) {
        pose_status = 1;
    }
}

//실시간 좌표와 json의 좌표값 비교
function check_pose(pose) {
    //목, 손바닥, 등, 허리 발바닥 좌표 없음
    let nose = pose.keypoints[0].position; //머리(코)
    let left_eye = pose.keypoints[1].position; //머리(왼쪽 눈)
    let right_eye = pose.keypoints[2].position; //머리(오른쪽 눈)
    let left_ear = pose.keypoints[3].position; //머리(왼쪽 귀)
    let right_ear = pose.keypoints[4].position; //머리(오른쪽 귀)
    let left_shoulder = pose.keypoints[5].position; //몸(왼쪽 어깨)
    let right_shoulder = pose.keypoints[6].position; //몸(오른쪽 어깨)
    let left_elbow = pose.keypoints[7].position; //몸(왼쪽 팔꿈치)
    let right_elbow = pose.keypoints[8].position; //몸(오른쪽 팔꿈치)
    let left_wrist = pose.keypoints[9].position; //몸(왼쪽 손목)
    let right_wrist = pose.keypoints[10].position; //몸(오른쪽 손목)
    let left_hip = pose.keypoints[11].position; //다리(왼쪽 엉덩이)
    let right_hip = pose.keypoints[12].position; //다리(오른쪽 엉덩이)
    let left_knee = pose.keypoints[13].position; //다리(무릎)
    let right_knee = pose.keypoints[14].position; //다리(무릎)
    let left_ankle = pose.keypoints[15].position; //다리(왼쪽 발목)
    let right_ankle = pose.keypoints[16].position; //다리(오른쪽 발목)
    

    // //팔꿈치가 어깨보다 높을 것, 양 팔꿈치 사이에 머리가 위치할 것
    // if (re.y < rs.y && le.y < ls.y && re.x < head.x && head.x < le.x) {
    //     //양쪽 손목 중, 어느 하나라도 머리보다는 위에 위치할 것
    //     if (rw.y < head.y || lw.y < head.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // } else {
    //     return false;
    // }
    // 11번까지 준비
    // 21번까지 준비->실행
    // 30번까지 실행
    // 45까지 실행->준비자세
    // 57까지 준비
}

function set_exercise(link) {
    // 반환값을 받을 Promise 객체 생성
    return new Promise(function (receive) {
        fetch(link) // json 파일 읽어오기
        .then(function (res) {
            return res.json(); // 읽어온 데이터를 json으로 변환
        })
        .then(function (data) { 
            // $('.main_section h1').text($('.main_section h1').text()+data.info.name);
            // $('.e_point').text($('.e_point').text()+data.info.e_point);
            // $('.desc').text($('.desc').text()+data.info.desc);
            receive(data.info); // json파일을 텍스트로
        });
    });
}
    let arnold_press_a = [];
    //성공 동작 json 파일 모두 가져옴 
    // 11번까지 준비
    // 21번까지 준비->실행
    // 30번까지 실행
    // 45까지 실행->준비자세
    // 57까지 준비
    for(let i=1; i<6; i++){
        for(let i2=1; i2<58; i2++){
            arnold_press_a[`Arnold_press_A_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_A/${i}/Arnold_press_A_cam${i}_${('0' + i2).slice(-2)}.json`;
            console.log(exercise_data(arnold_press_a[`Arnold_press_A_cam${i}_${('0' + i2).slice(-2)}`]));
        }
    }
    
    async function exercise_data(link) { 
        jsonData = await set_exercise(link); 
        if(jsonData.frame <= 11 || 45 > jsonData.frame <= 57){
            jsonData.status = 'ready';
        } else if(11 > jsonData.frame <= 21 || 30 > jsonData.frame <= 45){
            jsonData.status = 'set';
        } else if(21 > jsonData.frame <= 30){
            jsonData.status = 'go';
        }
        return await jsonData;
      };


function check_O(pose) {
    rw = pose.keypoints[10].position; //오른쪽 손목
    re = pose.keypoints[8].position; //오른쪽 팔꿈치
    lw = pose.keypoints[9].position; //왼쪽 손목
    le = pose.keypoints[7].position; //왼쪽 팔꿈치
    if (check_pose(pose) && ((re.x < rw.x && rw.y < re.y) || (le.x > lw.x && le.y > lw.y))) {
        return true;
    } else {
        return false;
    }
}

function check_X(pose) {

    head = pose.keypoints[0].position; //머리(코)
    rw = pose.keypoints[10].position; //오른쪽 손목
    re = pose.keypoints[8].position; //오른쪽 팔꿈치
    rs = pose.keypoints[6].position; //오른쪽 어깨
    lw = pose.keypoints[9].position; //왼쪽 손목
    le = pose.keypoints[7].position; //왼쪽 팔꿈치
    ls = pose.keypoints[5].position; //왼쪽 어깨
    b = pose.keypoints[12].position; //body(오른쪽 골반)
    //골반보다 팔꿈치가 위쪽에 위치, 팔꿈치보다 손목이 위쪽에 위치, 손목보다 머리가 위쪽에 위치
    if (b.y > le.y && b.y > re.y && le.y > lw.y && re.y > rw.y && lw.y > head.y && rw.y > head.y) {
        //어깨 안쪽으로 손목이 위치
        if (rs.x < rw.x || lw.x < ls.x) {
            r_gradient = -1;
            l_gradient = 1;
            if (rw.x - re.x != 0) {
                r_gradient = (rw.y - re.y) / (rw.x - re.x);
            }
            if (lw.x - le.x != 0) {
                l_gradient = (lw.y - le.y) / (lw.x - le.x);
            }
            if (r_gradient < 0 || l_gradient > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

/* PoseNet을 쓰면서 사용하는 함수들 코드 - 그냥 복사해서 쓰기 */
//tensorflow에서 제공하는 js 파트
const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;
function toTuple({y, x}) {
    return [y, x];
}

function drawPoint(ctx, y, x, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);
    adjacentKeyPoints.forEach((keypoints) => {
        drawSegment(toTuple(keypoints[0].position), toTuple(keypoints[1].position), color, scale, ctx);
    });
}

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];
        if (keypoint.score < minConfidence) {
            continue;
        }
        const {y, x} = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 3, color);
    }
}

function drawBoundingBox(keypoints, ctx) {
    const boundingBox = posenet.getBoundingBox(keypoints);
    ctx.rect(
        boundingBox.minX,
        boundingBox.minY,
        boundingBox.maxX - boundingBox.minX,
        boundingBox.maxY - boundingBox.minY
    );
    ctx.strokeStyle = boundingBoxColor;
    ctx.stroke();
}