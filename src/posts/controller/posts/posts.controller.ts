import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  RequestTimeoutException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { CreatePostDto } from 'src/posts/dtos/CreatePostDto';
import { UpdatePostDto } from 'src/posts/dtos/UpdatePostDto';
import { PostsService } from 'src/posts/service/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POST_SERVICE') private readonly postsService: PostsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user: any = req.user;
    const userId = user.id;

    const post = await this.postsService.createPost(createPostDto, userId);
    if (post) return post;
    throw new RequestTimeoutException();
  }

  @Get('')
  async getPost() {
    const post = await this.postsService.getPost();
    return post;
  }

  @Get('/postId/:postId')
  async getPostById(@Param('postId', ParseIntPipe) postId: number) {
    const post = await this.postsService.getPostById(postId);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/postId/:postId')
  async updatePost(
    @Body() updatePostDto: UpdatePostDto,
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: Request,
  ) {
    const user: any = req.user;
    const userId = parseInt(user.id);

    const post = await this.postsService.updatePost(
      updatePostDto,
      postId,
      userId,
    );
    if (post) return { message: 'successfully updated post' };
    throw new UnprocessableEntityException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/postId/:postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: Request,
  ) {
    const user: any = req.user;
    const userId = parseInt(user.id);
    const post = await this.postsService.deletePost(postId, userId);
    if (post) return { message: 'successfully deleted post' };
    throw new UnprocessableEntityException();
  }
}
