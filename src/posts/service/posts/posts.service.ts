import { CreatePostDto } from './../../dtos/CreatePostDto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from '../../dtos/UpdatePostDto';
import { Post as PostEntity } from '../../../typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../../../users/services/users/users.service';

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

  async getPostByUserId(userId: number) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post.id', 'post.title', 'post.description', 'user.id'])
      .where('user.id = :userId', { userId })
      .getMany();

    console.log(posts);
    return posts;
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
