var QLNDsevice = new QLNDservice ();
var validation = new Validation();
function getEle (id){
    return document.getElementById(id);
}

// Validation

function layThongTin(){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;

    var Qlnd = new QLND(
        taiKhoan,
        hoTen,
        matKhau,
        email,
        loaiND,
        ngonNgu,
        moTa,
        hinhAnh
    );
    return Qlnd
}

function getListQLNDApi(){
    QLNDsevice.getListQLNDApi()
    .then(function(result){
        renderHTML(result.data)

    })
    .catch(function(error){
        console.log(error);
    })
}

getListQLNDApi();

function renderHTML(data){
    var content ="";
    data.forEach(function(product, index){
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.taiKhoan}</td>
                <td>${product.matKhau}</td>
                <td>${product.hoTen}</td>
                <td>${product.email}</td>
                <td>${product.ngonNgu}</td>
                <td>${product.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal"  
                    onclick="editQLND('${
                        product.id
                    }')">Edit</button>
                    <button class="btn btn-danger " onclick ="deleteQLND('${
                        product.id
                    }')">Delete</button>
                </td>
            </tr>
        `;
    });
    getEle("tblDanhSachNguoiDung").innerHTML = content;
}

//edit list
function editQLND(id){
    var title = "Sửa thông tin"
    document.getElementsByClassName("modal-title")[0].innerHTML = title
    var button = `<button class="btn btn-success" onclick="updateQLND(${id})">Xác nhận</button>`;

    document.getElementsByClassName("modal-footer")[0].innerHTML = button;

    QLNDsevice
    .getQLNDApi(id)
    .then((result)=>{
        var qlnd = result.data
        getEle("TaiKhoan").value = qlnd.taiKhoan;
        getEle("HoTen").value = qlnd.hoTen;
        getEle("MatKhau").value = qlnd.matKhau;
        getEle("Email").value = qlnd.email;
        getEle("HinhAnh").value = qlnd.hinhAnh;
        getEle("loaiNguoiDung").value = qlnd.loaiND;
        getEle("loaiNgonNgu").value = qlnd.ngonNgu;
        getEle("MoTa").value = qlnd.moTa;
    })
    .catch((error)=>{
        console.log(error);
    })
}

//update 
function updateQLND(id){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var loaiND = getEle("loaiNguoiDung").value;
    var ngonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var qlnd = new QLND(id, taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa);
    
    QLNDsevice.updateQLNDApi(qlnd)
    .then((result)=>{
        alert("Update Success")
        getListQLNDApi()
        document.getElementsByClassName("close")[0].click();
    })
    .catch((error)=>{
        console.log(error);
    })
}

//delete list
function deleteQLND(id){
    QLNDsevice.deleteQLNDApi(id)
    .then(function(result){
        alert("Delete Success!")
        getListQLNDApi();
    })
    .catch(function(error){
        console.log(error);
    })

}
//add list 
getEle("btnThemNguoiDung").onclick = function(){
    var title = "Thêm nhân viên"
    document.getElementsByClassName("modal-title")[0].innerHTML = title
    var button = `<button class="btn btn-success" onclick=addQLND()>Thêm</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = button
}



function addQLND(){
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    console.log(taiKhoan, hoTen);
    var qlnd = new QLND ("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa);
    
    var isValid = true;
    // kiểm tra rỗng;
    isValid &= validation.kiemTraRong(
        taiKhoan, 
        "errorTK", 
        "Vui lòng nhập tài khoản")

    isValid &= validation.kiemTraRong(
        matKhau,
        "errorMK",
        "Vui lòng nhập mật khẩu"
    )
    isValid &= validation.kiemTraRong(
        hoTen,
        "errorHT",
        "Vui lòng nhập họ tên"
    )
    && validation.kiemTraChuoi(hoTen, "errorHT", "Vui lòng nhập đúng định dạng")
    isValid &= validation.kiemTraRong(
        email,
        "errorEM",
        "Vui lòng nhập Email"
    )
    && validation.kiemTraEmail(email, "errorEM", "Vui lòng nhập đúng định dạng")
    isValid &= validation.kiemTraRong(
        hinhAnh,
        "errorHA",
        "Vui lòng nhập hình ảnh"
    )
    isValid &= validation.kiemTraRong(
        loaiNguoiDung,
        "errorND",
        "Vui lòng nhập người dùng"
    )
    && validation.kiemTraSelect("loaiNguoiDung", "errorND", "Vui lòng chọn lựa chọn")
    isValid &= validation.kiemTraRong(
        loaiNgonNgu,
        "errorNN",
        "Vui lòng nhập ngôn ngữ"
    )
    && validation.kiemTraSelect("loaiNgonNgu", "errorNN", "Vui lòng chọn lựa chọn")
    isValid &= validation.kiemTraRong(
        moTa,
        "errorMT",
        "Vui lòng nhập mô tả"
    )
    && validation.kiemTraSoTu("errorMT", "Vui lòng nhập ít hơn 60 từ", 1, 60)

    if(isValid === true){
    QLNDsevice.addQLNDApi(qlnd)
        .then(function(result){
            alert("Add success!")
            getListQLNDApi();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function(error){
            console.log(error)
        });
    }
}




