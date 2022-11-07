
$(()=>{

})
// console.log(arnold_press);

// console.log(json_data);
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let json_data = [];
let pose_status = 2;
let keep_time = [0, 0, 0];
let result_message = "";
//webcam을 enable하는 코드
navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
    video.srcObject = stream;
});
$('#arnold').click(()=>{

     $.each(arnold_press, (k,v)=>{
        console.log(arnold_press[k]());
     })
})

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

            check_pose(pose);
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


//실시간 좌표와 json의 좌표값 비교
function check_pose(pose) {
    let data = json_data;
    // console.log(data);
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
    // key 정답 
    // 나머지 실패
    // 퍼센트로만
    $.each(data, (k,v) => {
        let data_nose = JSON.parse(`[${v.bones.nose}]`);
        let data_left_eye = JSON.parse(`[${v.bones.left_eye}]`);
        let data_right_eye = JSON.parse(`[${v.bones.right_eye}]`);
        let data_left_ear = JSON.parse(`[${v.bones.left_ear}]`);
        let data_right_ear = JSON.parse(`[${v.bones.right_ear}]`);
        let data_left_shoulder = JSON.parse(`[${v.bones.left_shoulder}]`);
        let data_right_shoulder = JSON.parse(`[${v.bones.right_shoulder}]`);
        let data_left_elbow = JSON.parse(`[${v.bones.left_elbow}]`);
        let data_right_elbow = JSON.parse(`[${v.bones.right_elbow}]`);
        let data_left_wrist = JSON.parse(`[${v.bones.left_wrist}]`);
        let data_right_wrist = JSON.parse(`[${v.bones.right_wrist}]`);
        let data_left_hip = JSON.parse(`[${v.bones.left_hip}]`);
        let data_right_hip = JSON.parse(`[${v.bones.right_hip}]`);
        let data_left_knee = JSON.parse(`[${v.bones.left_knee}]`);
        let data_right_knee = JSON.parse(`[${v.bones.right_knee}]`);
        let data_left_ankle = JSON.parse(`[${v.bones.left_ankle}]`);
        let data_right_ankle = JSON.parse(`[${v.bones.right_ankle}]`);

        //준비동작일 때
        if(v.status == 'ready'){
            if(parseInt(data_left_shoulder[0]) == parseInt(left_shoulder['x'])){
                
            }
        }
    })


}


const arnold_press = {
    a : () => {
        let arnold_press_a = [];
        console.log(arnold_press_a);
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_a[`Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_a/${i}/Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_a[`Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    b1 : () => {
        let arnold_press_b1 = [];
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_b1[`Arnold_press_b1_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_b1/${i}/Arnold_press_b1_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_b1[`Arnold_press_b1_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    b2 : () => {
        let arnold_press_b2 = [];
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_b2[`Arnold_press_b2_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_b2/${i}/Arnold_press_b2_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_b2[`Arnold_press_b2_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    c : () => {
        let arnold_press_c = [];
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_c[`Arnold_press_C_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_C/${i}/Arnold_press_C_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_c[`Arnold_press_C_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    d : () => {
        let arnold_press_d = [];
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_d[`Arnold_press_d_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_d/${i}/Arnold_press_d_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_d[`Arnold_press_d_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    e : () => {
        let arnold_press_e = [];
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_e[`Arnold_press_e_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_e/${i}/Arnold_press_e_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_e[`Arnold_press_e_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
        
        
    },

    key : ()=> {
        let arnold_press_key = [];
        console.log(arnold_press_key);
        for(let i=1; i<6; i++){
            for(let i2=1; i2<58; i2++){
                arnold_press_key[`Arnold_press_key_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_key/${i}/Arnold_press_key_cam${i}_${('0' + i2).slice(-2)}.json`;
                exercise_data(arnold_press_key[`Arnold_press_key_cam${i}_${('0' + i2).slice(-2)}`]);
            }
        }
    },

}
// function arnold_press_a(){
//     let arnold_press_a = [];
//     for(let i=1; i<6; i++){
//         for(let i2=1; i2<58; i2++){
//             arnold_press_a[`Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}`] = `./json/arnold_press/Arnold_press_a/${i}/Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}.json`;
//             exercise_data(arnold_press_a[`Arnold_press_a_cam${i}_${('0' + i2).slice(-2)}`]);
//         }
//     }
    
//     async function exercise_data(link) { 
//         let data = await set_exercise(link); 
//         //준비
//         if(data.frame <= 11 || 45 > data.frame <= 57){
//             data.status = 'ready';
//         //실행중
//         } else if(11 > data.frame <= 21 || 30 > data.frame <= 45){
//             data.status = 'set';
//         //실행
//         } else if(21 > data.frame <= 30){
//             data.status = 'go';
//         }
//         json_data.push(data);
//       };
// }


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
async function exercise_data(link) { 
    let data = await set_exercise(link); 
    json_data.push(data);
};

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