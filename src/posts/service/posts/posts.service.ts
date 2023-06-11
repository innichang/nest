import { CreatePostDto } from './../../dtos/CreatePostDto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from 'src/posts/dtos/UpdatePostDto';
import { Post as PostEntity } from 'src/typeorm';
import { UsersService } from 'src/users/services/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  async createPost(
    createPostDto: CreatePostDto,
    userId: any,
  ): Promise<PostEntity> {
    if (!userId) {
      throw new NotFoundException('User Not Found');
    }

    const createPost = new PostEntity();
    createPost.title = createPostDto.title;
    createPost.description = createPostDto.description;
    createPost.user = userId;

    return await this.postRepository.save(createPost);
  }

  async getPost() {
    return this.postRepository.find();
  }

  async getPostById(postId: number) {
    const post = await this.postRepository.findBy({ id: postId });
    return post;
  }

  async updatePost(
    updatePostDto: UpdatePostDto,
    postId: number,
    userId: number,
  ) {
    const checkUserOwnership = await this.getPostById(postId);
    if (checkUserOwnership[0].user.id === userId) {
      const post = await this.postRepository
        .createQueryBuilder()
        .update(PostEntity)
        .set({
          title: updatePostDto.title,
          description: updatePostDto.description,
        })
        .where('id = :postId', { postId })
        .execute();

      return post;
    } else {
      return false;
    }
  }

  async deletePost(postId: number, userId: number) {
    const checkUserOwnership = await this.getPostById(postId);
    if (checkUserOwnership[0].user.id === userId) {
      const post = await this.postRepository.delete({ id: postId });
      return post.affected;
    }
  }
}
