import { Medal, Crown, Zap, Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PortfolioLeader, XpLeader } from "../page";

type PortfolioProps = {
  type: "portfolio";
  users: PortfolioLeader[];
};

type XpProps = {
  type: "xp";
  users: XpLeader[];
};

type LeaderboardListProps = PortfolioProps | XpProps;

export default function LeaderboardList(props: LeaderboardListProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-muted-foreground font-medium">{rank}</span>;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1)
      return "bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border-yellow-500/30";
    if (rank === 2)
      return "bg-gradient-to-r from-gray-400/20 to-gray-500/10 border-gray-400/30";
    if (rank === 3)
      return "bg-gradient-to-r from-amber-600/20 to-orange-500/10 border-amber-600/30";
    return "bg-secondary/30";
  };

  /* ---------------- PORTFOLIO LIST ---------------- */
  if (props.type === "portfolio") {
    return (
      <div className="glass-card p-4 sm:p-6 space-y-3">
        {props.users.map((user) => (
          <div
            key={user.rank}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border",
              getRankStyle(user.rank)
            )}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center">
                {getRankIcon(user.rank)}
              </div>

              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-bold">
                {user.avatar}
              </div>

              <div>
                <p className="font-semibold">{user.name}</p>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {user.xp} XP
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {user.streak} days
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-display text-lg font-bold text-success">
                +{user.returns}%
              </p>
              <p className="text-xs text-muted-foreground">Returns</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---------------- XP LIST ---------------- */
  return (
    <div className="glass-card p-4 sm:p-6 space-y-3">
      {props.users.map((user) => (
        <div
          key={user.rank}
          className={cn(
            "flex items-center justify-between p-4 rounded-xl border",
            getRankStyle(user.rank)
          )}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center">
              {getRankIcon(user.rank)}
            </div>

            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center font-bold">
              {user.avatar}
            </div>

            <div>
              <p className="font-semibold">{user.name}</p>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {user.badges} badges
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {user.streak} days
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="font-display text-lg font-bold text-primary">
              {user.xp}
            </p>
            <p className="text-xs text-muted-foreground">XP Points</p>
          </div>
        </div>
      ))}
    </div>
  );
}
