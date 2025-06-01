<template>
	<div class="container">
        <router-link class="nav-link" :to="{ name: 'home' }"><h1>축구 커뮤니티</h1></router-link>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav me-auto w-100" id="nav-items">
						
						<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'postList', params: { category: 'kleague' } }">K리그</router-link>
						</li>
						<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'postList', params: { category: 'epl' } }">EPL</router-link>
						</li>
						<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'postList', params: { category: 'bundesliga' } }">분데스리가</router-link>
						</li>
						<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'postList', params: { category: 'laliga' } }">라리가</router-link>
						</li>
						<li class="nav-item">
						<router-link class="nav-link" :to="{ name: 'postList', params: { category: 'free' } }">자유게시판</router-link>
						</li>
						<template v-if="uData.checkAuth">
							<li class="nav-item" id="memberList">
								<router-link class="nav-link" :to="{name : 'memberList'}">회원목록</router-link>
							</li>
						</template>
					</ul>
				</div>

				<template v-if="uData.getUserInfo">
					<button class="btn btn-outline-danger me-2 login" id="goLogOut" type="button" @click="logout">
						<span class="route">로그아웃</span>
					</button>
					<router-link class="route" :to="{name : 'memberDetail'}">
						<button class="btn btn-outline-success me-2 login" id="detailMember" type="button">
							상세보기
						</button>
					</router-link>	
				</template>

				<template v-if="!uData.getUserInfo">
					<router-link class="route" :to="{name: 'login'}">
						<button class="btn btn-outline-success me-2 nologin" id="goLogin" type="button">
							로그인	
						</button>
					</router-link>
					<router-link class="route" :to="{name: 'memberRegisterForm'}">
						<button class="btn btn-outline-success me-2 nologin" id="goRegister" type="button">
							회원가입
						</button>
					</router-link>				
				</template>				
			</div>
		</nav>
    </div>
</template>

<script setup>
	import { userData } from '@/util/login';

	const uData = userData();

	const logout = () => {
		uData.logout();
	}

</script>