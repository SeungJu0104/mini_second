<template>
	<div class="container">
        <h1>축구 커뮤니티</h1>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav me-auto w-100" id="nav-items">
					<li class="nav-item">
						<router-link class="nav-link" to="/board/K리그">K리그</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/board/EPL">EPL</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/board/분데스리가">분데스리가</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/board/라리가">라리가</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/board/자유게시판">자유게시판</router-link>
					</li>
					<li class="nav-item" id="memberList">
						<router-link class="nav-link" to="/member/memberList">회원목록</router-link>
					</li>
					</ul>
				</div>
				<template v-if="localStorage"></template> <!--로컬 스토리지에 id 확인해 v-if로 렌더링에서 제외시키기-->
				<button class="btn btn-outline-success me-2 nologin" id="goLogin" type="button">
					<router-link class="route" to="/member/login">로그인</router-link>
				</button>
				<button class="btn btn-outline-danger me-2 login" id="goLogOut" type="button" >
					<router-link class="route" to="/member/logout">로그아웃</router-link>
				</button>
				<button class="btn btn-outline-success me-2 login" id="detailMember" type="button">
					<router-link class="route" to="/member/memberList">상세보기</router-link>
				</button>
				<button class="btn btn-outline-success me-2 nologin" id="goRegister" type="button">
					<router-link class="route" to="/member/registerForm">회원가입</router-link>
				</button>
			</div>
		</nav>
    </div>
</template>

<script setup>
    defineOptions({
        name : 'Header'
    })
</script>