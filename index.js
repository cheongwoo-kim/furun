
$(()=>{

})
// .on('click', '#arnold')
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const json_data = [];
let test2 = 0;
let total = {};
let pose_status = 2;
let keep_time = [0, 0, 0];
let result_message = "";
//webcam을 enable하는 코드
navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
    video.srcObject = stream;
});


//아놀드프레스
$('#arnold').click(()=>{
    const arnold_press = {
        a : set_exercise(58,'Arnold_press_A_cam','./json/arnold_press/Arnold_press_a/'),
        b1 : set_exercise(58,'Arnold_press_B1_cam','./json/arnold_press/Arnold_press_b1/'),
        b2 : set_exercise(58,'Arnold_press_B2_cam','./json/arnold_press/Arnold_press_b2/'),
        c : set_exercise(58,'Arnold_press_C_cam','./json/arnold_press/Arnold_press_c/'),
        d : set_exercise(57,'Arnold_press_D_cam','./json/arnold_press/Arnold_press_d/'),
        e : set_exercise(58,'Arnold_press_E_cam','./json/arnold_press/Arnold_press_e/'),
        key : set_exercise(58,'Arnold_press_KEY_cam','./json/arnold_press/Arnold_press_key/')
    }
     $.each(arnold_press, (k,v)=>{
        arnold_press[k];
     })
     set_poss([11,57],[21,45],30);
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

    let sum = 
        nose['x'] + nose['y'] + 
        left_eye['x'] + left_eye['y'] +
        right_eye['x'] + right_eye['y'] +
        left_ear['x'] + left_ear['y'] +
        right_ear['x'] + right_ear['y'] +
        left_shoulder['x'] + left_shoulder['y'] +
        right_shoulder['x'] + right_shoulder['y'] +
        left_elbow['x'] + left_elbow['y'] +
        right_elbow['x'] + right_elbow['y'] +
        left_wrist['x'] + left_wrist['y'] +
        right_wrist['x'] + right_wrist['y'] +
        left_hip['x'] + left_hip['y'] +
        right_hip['x'] + right_hip['y'] +
        right_hip['x'] + right_hip['y'] +
        left_knee['x'] + left_knee['y'] +
        right_knee['x'] + right_knee['y'] +
        left_ankle['x'] + left_ankle['y'] +
        right_ankle['x'] + right_ankle['y'];
    
    
}
/**
 * json 파일 세팅
 *
 * @param   {[string]}  file    파일 개수
 * @param   {[string]}  name    배열명(숫자 제외한 파일 명)
 * @param   {[string]}  url     파일 경로(숫자 폴더 이전 경로 까지만)
 *
 */
function set_exercise(file,name,url){
    console.log(1)
    let exer_arr = [];
    //i 캠 개수 5개
    for(let i=1; i<6; i++){
        for(let i2=1; i2<file; i2++){
            exer_arr[`${name+i}_${('0' + i2).slice(-2)}`] = `${url+i}/${name+i}_${('0' + i2).slice(-2)}.json`;
            json_reader(exer_arr[`${name+i}_${('0' + i2).slice(-2)}`]);
        }
    }
}

//json 파일 데이터 요청 후 전역변수 배열에 데이터 push
function json_reader(link) {
    $.ajax({
        async: false, //동기처리 안하면 메모리 에러 뜸
        dataType : 'Json',
        url: link,
    }
    ).done((data)=>{
        json_data.push(data.info);
    }).fail((a,b,c)=>{
        console.log(a)
    })
}


/**
 * 포즈 세팅 후 3단계 동작으로 나눈 후 동작의 좌표값 평균을 구한다
 *
 * @return  {[array]}  ready 준비 자세 프레임 
 * @return  {[array]}  set 실행중 자세 프레임
 * @return  {[int]}  go 실행 자세 프레임
 */
function set_poss(ready,set,go) { 
    $.each(json_data, (k,v) => {
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

       
        let sum_arr = [];
        
         //x 축 y축 모두 더하기
        let sum = data_nose[0] + data_nose[1] + 
        data_left_eye[0] + data_left_eye[1] +
        data_right_eye[0] + data_right_eye[1] +
        data_left_ear[0] + data_left_ear[1] +
        data_right_ear[0] + data_right_ear[1] +
        data_left_shoulder[0] + data_left_shoulder[1] +
        data_right_shoulder[0] + data_right_shoulder[1] +
        data_left_elbow[0] + data_left_elbow[1] +
        data_right_elbow[0] + data_right_elbow[1] +
        data_left_wrist[0] + data_left_wrist[1] +
        data_right_wrist[0] + data_right_wrist[1] +
        data_left_hip[0] + data_left_hip[1] +
        data_right_hip[0] + data_right_hip[1] +
        data_right_hip[0] + data_right_hip[1] +
        data_left_knee[0] + data_left_knee[1] +
        data_right_knee[0] + data_right_knee[1] +
        data_left_ankle[0] + data_left_ankle[1] +
        data_right_ankle[0] + data_right_ankle[1];
        
        
        let sum_ready = 0;
        let sum_set = 0;
        let sum_go = 0;
        if(v.conditions == 'KEY'){
            //준비
            if(v.frame <= ready[0] || set[1] > v.frame <= ready[1]){
                sum_arr.push(sum);
                //배열에 담기(length로 반복문 돌려서 평균 구하기 위해)
                for(let i = 0; i < sum_arr.length; i++){
                    
                    sum_ready += sum_arr[i];
                }
            }

            //실행중
            if(ready[0] > v.frame <= set[0] || go > v.frame <= set[1]){
                sum_arr.push(sum);
                for(let i = 0; i < sum_arr.length; i++){
                    
                    sum_set += sum_arr[i];
                }
            }

            //실행
            if(set[0] > v.frame <= go){
                sum_arr.push(sum);
                for(let i = 0; i < sum_arr.length; i++){
                    sum_go += sum_arr[i];
                }

            }
            total.key = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
        } 
        else if(v.conditions == 'A'){
            total['a'] = sum
            
        } else if(v.conditions == 'B1'){
            total['b1'] = sum
            
        } else if(v.conditions == 'B2'){
            total['b2'] = sum
            
        } else if(v.conditions == 'C'){
            total['c'] = sum
            
        } else if(v.conditions == 'D'){
            total['d'] = sum
            
        } else if(v.conditions == 'E'){
            total['e'] = sum
        }
    })
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