
$(()=>{

})
// .on('click', '#arnold')
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const json_data = [];
let total = {};
//webcam을 enable하는 코드
navigator.mediaDevices.getUserMedia({video: true, audio: false}).then(function (stream) {
    video.srcObject = stream;
});


//아놀드프레스
$('#arnold').click(()=>{
        $('.loading').removeClass('d-none');
        setTimeout(() => {
            let arnold_press = {
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
             set_poss([11,58],[21,45],30);
             $('.loading').addClass('d-none');
          }, 1000);

    
    
})
//시티드 숄더프레스
$('#s_shoulder').click(()=>{
    let arnold_press = {
        d : set_exercise(57,'Seated_shoulder_press_D_cam','./json/Seated_shoulder_press/Seated_shoulder_press_D/'),
        key : set_exercise(56,'Seated_shoulder_press_KEY_cam','./json/Seated_shoulder_press/Seated_shoulder_press_KEY/')
    }
     $.each(arnold_press, (k,v)=>{
        arnold_press[k];
     })
     set_poss([8,57],[17,48],33);
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

//실시간 좌표와 json의 좌표값 비교
function check_pose(pose) {
    //목, 손바닥, 등, 허리 발바닥 좌표 없음
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
        left_shoulder['x'] + left_shoulder['y'] +
        right_shoulder['x'] + right_shoulder['y'] +
        left_elbow['x'] + left_elbow['y'] +
        right_elbow['x'] + right_elbow['y'] +
        left_wrist['x'] + left_wrist['y'] +
        right_wrist['x'] + right_wrist['y'] +
        left_hip['x'] + left_hip['y'] +
        right_hip['x'] + right_hip['y'] +
        left_knee['x'] + left_knee['y'] +
        right_knee['x'] + right_knee['y'] +
        left_ankle['x'] + left_ankle['y'] +
        right_ankle['x'] + right_ankle['y'];
        // console.log(
        // `
        // left_shoulder = ${left_shoulder['x'] + left_shoulder['y']} right_shoulder = ${right_shoulder['x'] + right_shoulder['y']}
        // left_elbow = ${left_elbow['x'] + left_elbow['y']} right_elbow = ${right_elbow['x'] + right_elbow['y']}
        // left_wrist = ${left_wrist['x'] + left_wrist['y']} right_wrist = ${right_wrist['x'] + right_wrist['y']}
        // left_hip = ${left_hip['x'] + left_hip['y']} right_hip = ${right_hip['x'] + right_hip['y']} 
        // left_knee = ${left_knee['x'] + left_knee['y']} right_knee = ${right_knee['x'] + right_knee['y']}
        // left_ankle = ${left_ankle['x'] + left_ankle['y']} right_ankle = ${right_ankle['x'] + right_ankle['y']}
        // `)
    $.each(total, (k,v) => {

        if(k =='key'){
            // $('.ready .key').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .key').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .key').text(`${parseInt(sum / v.go * 100)}%`);
        } else if (k =='a'){
            // $('.ready .a').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .a').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .a').text(`${parseInt(sum / v.go * 100)}%`);
        } else if(k =='b1'){
            // $('.ready .b1').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .b1').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .b1').text(`${parseInt(sum / v.go * 100)}%`);
        } else if(k =='b2'){
            // $('.ready .b2').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .b2').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .b2').text(`${parseInt(sum / v.go * 100)}%`);
        } else if(k =='c'){
            // $('.ready .c').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .c').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .c').text(`${parseInt(sum / v.go * 100)}%`);
        } else if(k =='d'){
            // $('.ready .d').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .d').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .d').text(`${parseInt(sum / v.go * 100)}%`);
        } else if(k =='e'){
            // $('.ready .e').text(`${parseInt(sum / v.ready * 100)}%`);
            // $('.set .e').text(`${parseInt(sum / v.set * 100)}%`);
            $('.go .e').text(`${parseInt(sum / v.go * 100)}%`);
        }
    })
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
    let sum_arr = [];
    let sum_arr2 = [];
    let sum_arr3 = [];
    let sum_arr4 = [];
    let sum_arr5 = [];
    let sum_arr6 = [];
    let sum_arr7 = [];
    let sum_arr8 = [];
    let sum_arr9 = [];
    let sum_arr10 = [];
    let sum_arr11 = [];
    let sum_arr12 = [];
    let sum_arr13 = [];
    let sum_arr14 = [];
    let sum_arr15 = [];
    let sum_arr16 = [];
    let sum_arr17 = [];
    let sum_arr18 = [];
    let sum_arr19 = [];
    let sum_arr20 = [];
    let sum_arr21 = [];
    let sum_ready = 0;
    let sum_set = 0;
    let sum_go = 0;
    $.each(json_data, (k,v) => {
        
        //눈, 귀, 코 좌표 제외
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

        //x 축 y축 모두 더하기
        let sum =
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
        
        if(v.conditions == 'KEY'){
            //key 포인트 때의 설명 추가 
            $('.e_point').text(v.e_point);
            $('.e_name').text(v.name)
            $('.e_desc').text(v.desc)

            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr.push(sum);
                for(let i = 0; i < sum_arr.length; i++){
                    sum_ready += sum_arr[i]
                }
                sum_ready /= sum_arr.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr2.push(sum);
                for(let i = 0; i < sum_arr2.length; i++){
                    sum_set += sum_arr2[i];
                }
                sum_set /= sum_arr2.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr3.push(sum);
                for(let i = 0; i < sum_arr3.length; i++){
                    
                    sum_go += sum_arr3[i];
                }
                sum_go /= sum_arr3.length;

            }
            total.key = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
        } 
        else if(v.conditions == 'A'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr4.push(sum);
                for(let i = 0; i < sum_arr4.length; i++){
                    sum_ready += sum_arr4[i]
                }
                sum_ready /= sum_arr4.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr5.push(sum);
                for(let i = 0; i < sum_arr5.length; i++){
                    sum_set += sum_arr5[i];
                }
                sum_set /= sum_arr5.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr6.push(sum);
                for(let i = 0; i < sum_arr6.length; i++){
                    
                    sum_go += sum_arr6[i];
                }
                sum_go /= sum_arr6.length;

            }
            total.a = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
            
        } else if(v.conditions == 'B1'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr7.push(sum);
                for(let i = 0; i < sum_arr7.length; i++){
                    sum_ready += sum_arr7[i]
                }
                sum_ready /= sum_arr7.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr8.push(sum);
                for(let i = 0; i < sum_arr8.length; i++){
                    sum_set += sum_arr8[i];
                }
                sum_set /= sum_arr8.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr9.push(sum);
                for(let i = 0; i < sum_arr9.length; i++){
                    
                    sum_go += sum_arr9[i];
                }
                sum_go /= sum_arr9.length;

            }
            total.b1 = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
            
        } else if(v.conditions == 'B2'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr10.push(sum);
                for(let i = 0; i < sum_arr10.length; i++){
                    sum_ready += sum_arr10[i]
                }
                sum_ready /= sum_arr10.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr11.push(sum);
                for(let i = 0; i < sum_arr11.length; i++){
                    sum_set += sum_arr11[i];
                }
                sum_set /= sum_arr11.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr12.push(sum);
                for(let i = 0; i < sum_arr12.length; i++){
                    
                    sum_go += sum_arr12[i];
                }
                sum_go /= sum_arr12.length;

            }
            total.b2 = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
            
        } else if(v.conditions == 'C'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr13.push(sum);
                for(let i = 0; i < sum_arr13.length; i++){
                    sum_ready += sum_arr13[i]
                }
                sum_ready /= sum_arr13.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr14.push(sum);
                for(let i = 0; i < sum_arr14.length; i++){
                    sum_set += sum_arr14[i];
                }
                sum_set /= sum_arr14.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr15.push(sum);
                for(let i = 0; i < sum_arr15.length; i++){
                    
                    sum_go += sum_arr15[i];
                }
                sum_go /= sum_arr15.length;

            }
            total.c = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
            
        } else if(v.conditions == 'D'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr16.push(sum);
                for(let i = 0; i < sum_arr16.length; i++){
                    sum_ready += sum_arr16[i]
                }
                sum_ready /= sum_arr16.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr17.push(sum);
                for(let i = 0; i < sum_arr17.length; i++){
                    sum_set += sum_arr17[i];
                }
                sum_set /= sum_arr17.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr18.push(sum);
                for(let i = 0; i < sum_arr18.length; i++){
                    
                    sum_go += sum_arr18[i];
                }
                sum_go /= sum_arr18.length;

            }
            total.d = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
            
        } else if(v.conditions == 'E'){
            if(v.frame <= ready[0] || set[1] < v.frame){
                sum_arr19.push(sum);
                for(let i = 0; i < sum_arr19.length; i++){
                    sum_ready += sum_arr19[i]
                }
                sum_ready /= sum_arr19.length;
                
            }

            //실행중
            if((go < v.frame && v.frame <= set[1]) || (ready[0] < v.frame && v.frame <= set[0])){
                sum_arr20.push(sum);
                for(let i = 0; i < sum_arr20.length; i++){
                    sum_set += sum_arr20[i];
                }
                sum_set /= sum_arr20.length;
            }

            //v.frame 중에 set[0]보다 크고 go보다 작은 수
            if(set[0] <=  v.frame && v.frame <= go){
                sum_arr21.push(sum);
                for(let i = 0; i < sum_arr21.length; i++){
                    
                    sum_go += sum_arr21[i];
                }
                sum_go /= sum_arr21.length;

            }
            total.e = {
                'ready' : sum_ready,
                'set' : sum_set,
                'go' : sum_go
            }
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