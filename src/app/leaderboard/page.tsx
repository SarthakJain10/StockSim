// frontend/src/app/leaderboard/page.tsx
import DashboardLayout from "@/components/DashboardLayout";
import LeaderboardTabs from "./_components/LeaderboardTabs";
import { Flame, TrendingUp, Zap } from "lucide-react";

export interface PortfolioLeader {
  rank: number;
  name: string;
  xp: number;
  returns: number;
  streak: number;
  avatar: string;
}

export interface XpLeader {
  rank: number;
  name: string;
  xp: number;
  badges: number;
  streak: number;
  avatar: string;
}

export default async function LeaderboardPage() {
  // Later replace with DB calls
  const portfolioLeaders = [
    { rank: 1, name: "Vikram Sharma", xp: 15420, returns: 28.5, streak: 45, avatar: "VS" },
    { rank: 2, name: "Priya Patel", xp: 14280, returns: 24.3, streak: 38, avatar: "PP" },
    { rank: 3, name: "Arjun Mehta", xp: 13150, returns: 22.1, streak: 32, avatar: "AM" },
    { rank: 4, name: "Sneha Gupta", xp: 11890, returns: 19.8, streak: 28, avatar: "SG" },
    { rank: 5, name: "Rahul Kumar", xp: 10450, returns: 17.2, streak: 25, avatar: "RK" },
    { rank: 6, name: "Anita Singh", xp: 9820, returns: 15.6, streak: 22, avatar: "AS" },
    { rank: 7, name: "Karan Joshi", xp: 8940, returns: 14.1, streak: 19, avatar: "KJ" },
    { rank: 8, name: "Deepa Nair", xp: 8210, returns: 12.8, streak: 17, avatar: "DN" },
    { rank: 9, name: "Amit Verma", xp: 7680, returns: 11.5, streak: 15, avatar: "AV" },
    { rank: 10, name: "Pooja Reddy", xp: 7120, returns: 10.2, streak: 14, avatar: "PR" },
  ];
  const xpLeaders = [
    { rank: 1, name: "Priya Patel", xp: 18920, badges: 24, streak: 52, avatar: "PP" },
    { rank: 2, name: "Vikram Sharma", xp: 17650, badges: 22, streak: 45, avatar: "VS" },
    { rank: 3, name: "Sneha Gupta", xp: 16280, badges: 20, streak: 41, avatar: "SG" },
    { rank: 4, name: "Arjun Mehta", xp: 15100, badges: 18, streak: 36, avatar: "AM" },
    { rank: 5, name: "Anita Singh", xp: 13890, badges: 16, streak: 30, avatar: "AS" },
    { rank: 6, name: "Rahul Kumar", xp: 12450, badges: 15, streak: 28, avatar: "RK" },
    { rank: 7, name: "Deepa Nair", xp: 11200, badges: 14, streak: 24, avatar: "DN" },
    { rank: 8, name: "Karan Joshi", xp: 10580, badges: 12, streak: 21, avatar: "KJ" },
    { rank: 9, name: "Pooja Reddy", xp: 9870, badges: 11, streak: 18, avatar: "PR" },
    { rank: 10, name: "Amit Verma", xp: 9150, badges: 10, streak: 16, avatar: "AV" },
  ];

  const currentUser = {
    rank: 42,
    name: "You",
    xp: 2450,
    returns: 5.34,
    streak: 7,
    avatar: "YO",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            See how you stack up against other learners
          </p>
        </div>

        {/* Your Rank Card */}
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center font-display text-xl font-bold text-primary">
                  {currentUser.avatar}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                  #{currentUser.rank}
                </div>
              </div>
              <div>
                <p className="font-display text-xl font-semibold">Your Ranking</p>
                <p className="text-muted-foreground">Keep learning to climb higher!</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 text-primary">
                  <Zap className="w-5 h-5" />
                  <span className="font-display text-xl font-bold">{currentUser.xp.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">XP Points</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-success">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-display text-xl font-bold">+{currentUser.returns}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Returns</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-warning">
                  <Flame className="w-5 h-5" />
                  <span className="font-display text-xl font-bold">{currentUser.streak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </div>
        </div>

        <LeaderboardTabs
          portfolioLeaders={portfolioLeaders}
          xpLeaders={xpLeaders}
        />
      </div>
    </DashboardLayout>
  );
}
