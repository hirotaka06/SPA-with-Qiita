import type { ArticleType } from '~/types/article';
import { Heart } from 'lucide-react';
import { Card } from '~/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';

export default function ArticleCard({
  created_at,
  title,
  tags = [],
  likes_count,
  user,
}: ArticleType) {
  return (
    <div className="md:w-auto">
      <div className="relative group">
        {/* Top neon line */}
        <div className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-800 ease-in-out inset-x-0 -top-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-rose-500 to-transparent" />
        {/* Bottom neon line */}
        <div className="absolute h-px opacity-100 group-hover:opacity-0 transition-all duration-800 ease-in-out inset-x-0 -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-purple-500 to-transparent" />

        <Card className="w-full bg-black/90 text-white p-6 relative overflow-hidden border border-white/10 transition-colors duration-200 hover:border-pink-500/20 hover:bg-dots">
          <div className="space-y-4">
            {/* Date */}
            <div className="text-sm text-green-200/80 group-hover:text-yellow-300">
              {new Date(created_at).toLocaleDateString()}
            </div>

            {/* Title */}
            <h2 className="text-xl font-medium leading-tight text-white transition-transform duration-200 transform group-hover:scale-102 line-clamp-2 h-12">
              {title}
            </h2>

            {/* Tags */}
            <div className="truncate space-x-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-green-300/90 group-hover:text-cyan-400"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* Bottom section with likes and avatar */}
            <div className="flex justify-between items-center pt-2">
              {/* Likes */}
              <div className="flex items-center gap-1 text-gray-400">
                <Heart className="w-5 h-5 fill-gray-400" />
                <span>{likes_count}</span>
              </div>

              {/* User info */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{user.id}</span>
                <Avatar className="w-10 h-10 ">
                  <AvatarImage src={user.profile_image_url} alt="User avatar" />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
