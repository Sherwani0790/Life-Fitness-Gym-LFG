import * as React from 'react';
import { Users, Briefcase, Dumbbell, Wallet, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/UI-Components/card';
import { cn } from '@/src/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
  iconColor?: string;
}

function StatCard({ title, value, icon, className, iconColor }: StatCardProps) {
  return (
    <Card className={cn("border-border shadow-sm overflow-hidden relative", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{title}</CardTitle>
        <div className={cn("p-1.5 rounded-lg bg-muted/50", iconColor)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold tracking-tight">{value}</div>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/10" />
    </Card>
  );
}

export default function Dashboard() {
  const stats = [
    { title: 'Total Members', value: '1,284', icon: <Users size={16} />, iconColor: 'text-blue-600 dark:text-blue-400' },
    { title: 'Total Employees', value: '24', icon: <Briefcase size={16} />, iconColor: 'text-emerald-600 dark:text-emerald-400' },
    { title: 'Total Trainers', value: '12', icon: <Dumbbell size={16} />, iconColor: 'text-amber-600 dark:text-amber-400' },
    { title: 'Total Collected Amount', value: 'PKR 2.4M', icon: <Wallet size={16} />, iconColor: 'text-purple-600 dark:text-purple-400' },
  ];

  const chartData = [
    { name: 'Members', value: 1284, color: '#2563eb' },
    { name: 'Employees', value: 24, color: '#10b981' },
    { name: 'Trainers', value: 12, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Real-time statistics and insights for GYM System.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-medium border border-primary/10">
          <TrendingUp size={14} />
          <span>System Performance: Optimal</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              Resource Distribution Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', opacity: 0.6, fontSize: 11 }}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm flex flex-col overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border">
            <CardTitle className="text-base font-semibold">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-6 flex-1 flex flex-col justify-center space-y-5">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
                </div>
                <span className="text-base font-bold">{item.value}</span>
              </div>
            ))}
            <div className="pt-5 border-t border-border mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
                <span className="text-lg font-bold text-emerald-600">PKR 2.4M</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
