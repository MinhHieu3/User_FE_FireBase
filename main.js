
function show() {
    axios.get("http://localhost:8080/api/users").then(res=>{
        let str=''
        res.data.map(item=>{
            str+=`${item.username},${item.password}, <img src="${item.avatar}" >`
        })
        document.getElementById("main").innerHTML=str;
    })
}
const firebaseConfig = {
    apiKey: "AIzaSyBdDYDur5mbq0klC3RNQRpLKUkoN7hT-Nc",
    authDomain: "test-91e51.firebaseapp.com",
    projectId: "test-91e51",
    storageBucket: "test-91e51.appspot.com",
    messagingSenderId: "477003899691",
    appId: "1:477003899691:web:9385956cfd07fcb8475b6e",
    measurementId: "G-34JPQ74YJ9"
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
let file;
let fileName;
let uploadedFileName;
let imageURL;
const getImageData = (e) => {
    file = e.target.files[0];
    fileName = Math.round(Math.random() * 9999) + file.name;
    const storageRef = storage.ref().child("myimages");
    const folderRef = storageRef.child(fileName);
    const uploadtask = folderRef.put(file);
    uploadtask.on(
        "state_changed",
        (snapshot) => {
            uploadedFileName = snapshot.ref.name;
        },
        (error) => {
            console.log(error);
        },
        () => {
            storage
                .ref("myimages")
                .child(uploadedFileName)
                .getDownloadURL()
                .then((url) => {

                    imageURL=url;
                });
        }
    );
};
function showFormAdd() {
    document.getElementById("main").innerHTML =
        '<input type="text" id="username">'+
        '<input type="password" id="pass">'+
        '<input type="file" onchange="getImageData(event)">'+
        '<button onclick="add()">Save</button>'

}
function add() {

    let data = {
        username: document.getElementById('username').value,
        password: document.getElementById('pass').value,
        avatar: imageURL
    }
    axios.post('http://localhost:8080/api/users', data).then(() => {
       show()
        imageURL='';
    })
}