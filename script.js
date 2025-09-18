const button=document.getElementById('downloadBtn');
const progressContainer=document.querySelector('.progress-container');
const progressBar=document.getElementById('progressBar');
const startSound=document.getElementById('startSound');
const beepSound=document.getElementById('beepSound');
const successSound=document.getElementById('successSound');

button.addEventListener('click',()=>{
  startSound.play();
  progressContainer.style.display='block';
  progressBar.style.width='0%';
  progressBar.style.backgroundColor='yellow';
  progressBar.textContent='جارٍ فحص الأمان...';
  progressBar.classList.remove('success');
  
  let progress=0;
  const interval=setInterval(()=>{
    progress+=5;
    progressBar.style.width=progress+'%';
    if(progress%15===0) beepSound.play();
    const green=Math.min(progress*2.55,255);
    progressBar.style.backgroundColor=`rgb(${255-green},${green},0)`;

    if(progress>=100){
      clearInterval(interval);
      progressBar.classList.add('success');
      progressBar.textContent='تم الفحص بنجاح!';
      successSound.play();
      const link=document.createElement('a');
      link.href='https://www.mediafire.com/file/v4iq9qtrtyykk1a/Brightora_4_copy.apk/file';
      link.download='Brightora_4_copy.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },200);
});

const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const particles=[];
for(let i=0;i<150;i++){particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*3+1,dx:(Math.random()-0.5)*1.5,dy:(Math.random()-0.5)*1.5});}
function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let p of particles){
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(255,255,255,0.7)';
    ctx.fill();
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
