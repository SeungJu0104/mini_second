<template>
  <div class="container">
    <h3>회원가입</h3>
    <form id="memberForm">
        <div class="mb-3">
          <label for="userid" class="form-label">아이디</label>
          <div class = "input-group">
          	<input type="text" class="form-control" id="userid" name="id" placeholder="아이디">
            <button class="btn btn-outline-success me-2 " id="idDupChk" type="button">중복확인</button>
          </div>
          <small class="idInfo" style="display : none">아이디는 8~10자이며, 영문자와 숫자만 포함해야 합니다.</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">비밀번호</label>
          <input type="password" class="form-control pwChk" id="password" name="password" placeholder="비밀번호" required>
          <input type="password" class="form-control mt-2 pwChk" id="passwordValid" placeholder="비밀번호확인" required>
          <small class="pwInfo" style="display : none">비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.</small>
          <small class="pwInfo2" style="display : none">비밀번호와 비밀번호 확인이 일치하지 않습니다.</small>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">이름</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="이름" required>
        </div>
        <div class="mb-3">
          <label for="handphone" class="form-label">전화번호</label>
          <input type="tel" class="form-control" id="handphone" name="phoneNumber" placeholder="010-0000-0000" maxlength="13" required>
          <small class="phoneInfo" style="display : none">010-0000-0000 형식으로 입력해주세요.</small>
        </div>
        <div class="mb-3">
            <label for="post_code" class="form-label">우편번호</label>
            <input type="text" class="form-control" id="postCode" name="postCode" placeholder="우편번호" required maxlength="5">
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">주소</label>
            <input type="text" class="form-control" id="address" name="address" placeholder="주소" required>
        </div>
        <div class="mb-3">
            <label for="detail_address" class="form-label">상세 주소</label>
            <input type="text" class="form-control" id="detail_address" name="detailAddress" placeholder="상세 주소" required>
        </div>
        <div class="mb-3">
            <label for="birthdate" class="form-label">생년월일</label>
            <input type="date" class="form-control" id="birthDate" name="birthDate" required>
        </div>
        <div class="d-flex flex-column align-items-center gap-2 mt-4">
          <button type="submit" class="btn btn-outline-success" id="memberRegister">전송</button>
        </div>
    </form>
  </div>    
</template>