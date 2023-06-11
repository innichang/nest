import { EntityRepository, Repository } from 'typeorm';
import { Post as PostEntity } from '../Entities/Post';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async getPostByUserId(userId: number): Promise<PostEntity[]> {
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post.id', 'post.title', 'post.description', 'user.id'])
      .where('user.id = :userId', { userId })
      .getMany();
  }
}
