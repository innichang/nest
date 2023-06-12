## Simple CRUD server using Nest.js

<br>

## 테이블 관계

Users : Post = 1 : Many

## 구조

사용되는 PostModule, UserModule, AuthModule 이 AppModule로 이어지는 형태

AppModule에는 사용에 필요한 TypeOrmModule을 보유하고있고,
AuthService, UsersService, PostsService가 providers로 들어가 있다.

### 1. Auth

Injection에 필요한 AuthService와 UsersService를 providers로 받고, Jwt발급을 위한 모듈, TypeOrm을 사용하기위한 모듈을 import해서 사용자가 로그인할때 발생하는 작업을 수행한다.

<br>AuthController => @Inject(AuthService)
<br>AuthService => @Inject(UsersService)

#### login

@Post('login') // endpoint: /api/auth/login은
username, password를 req.body로 받으며 시작된다. <br><br>
login 함수가 service 딴에 validateUser로 넘기면, validateUser에서는 여러가지 기능들이 동작하는데, <br> 먼저 uesrsService.findUserbyUsername으로 유저 존재의 유무를 파악하면서 정보를 가져온다.
<br>정보가 존재하면 bcrypt.ts에 작성해놓은 comparePasswords로 암호화된 비밀번호와 요청받은 비밀번호를 비교해, <br>
if true => jwt 발급<br>
if false => UnauthorizedException('Invalid Entry')

### 2. User

실제로 사용되는 UsersService만 provider로 받으며 <br>
UsersController => @Inject(UsersService)로 사용된다.

#### CRUD 동작들:

Create: <br>@Post('signup') //endpoint /api/users/signup<br>
유저 정보를 CreateUserDto의 형식으로 받아서 유저를 가입시킨다.

Read: <br>@Get('username/:username') //endpoint => /api/users/username/:username <br>
유저이름을 받아서 유저를 찾아온다. (동일하게 id로 찾는것도 존재함)

---

Unit-Test: <br> UsersController에 관하여 작성. <br> UsersService에서 유저에대한 모든 정보가 넘어올때 민감 정보를 노출시키지않기 위해, class-validator이 존재하는데 @UsePipes 데코레이터로 함수에 적용. 그것이 제대로 적용되는지 테스트.

### 3. Post

PostModule에서는 PostsService, UsersService, AuthService가 모두 providers로 등록됨.<br>
import: TypeOrmModule과 UserModule<br>
대부분의 호출에는 jwt가 동반하며, create,update,delete는 token을 해독한 후 authorize가 가능하면 실행한다.<br>
@UseGuards(JwtAuthGuard) 로 들어오는 요청 보호

#### CRUD 동작들:

Create: <br>
@Post('') // endpoint => /api/posts<br>
CreatePostDto 형태의 body request를 받아 새로운 포스트를 등록 시킨다.<br>
이때 함께 들어오는 사용자의 jwt를 사용해서 유저를 파악하고, post를 생성하는 유저 정보도 함께 저장.
<br>
<br>
Read: <br>
@Get ('') // endpoint => /api/posts<br>
모든 포스트에 대한 정보를 불러옴<br><br>
@Get ('/postId/:postId') endpoint => /api/posts/postId/:postId<br>
포스트를 id에 관하여 불러온다<br><br>
@Get('/userId/:userId') endpoint => /api/posts/userId/:userId<br>
특정 유저가 쓴 모든 포스트를 불러온다<br><br>

Update: <br>
@Patch('/update/postId/:postId') // endpoint => /api/posts/update/postId/:postId <br>
Update될 내용, postId, userId를 모두 받아와서 update하려는 post가 해당 userId를 가지고 있어야 update가능
<br><br>
Delete:<br>
@Delete('/delete/postId/:postId') // endpoint => /api/posts/delete/postId/:postId<br>
위 @Patch와 동일한 성질로 동작
