import { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  FileText,
  Plus,
  Star,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Course {
  id: string;
  name: string;
  code: string;
  teacher: string;
  time: string;
  students: number;
  assignments: number;
  color: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'upcoming' | 'overdue' | 'completed';
  type: 'assignment' | 'quiz' | 'material';
}

interface ClassroomDashboardProps {
  className?: string;
}

export function ClassroomDashboard({ className }: ClassroomDashboardProps) {
  const [_searchQuery, _setSearchQuery] = useState('');

  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      code: 'MATH 301',
      teacher: 'Dr. Sarah Johnson',
      time: 'Mon, Wed, Fri 10:00 AM',
      students: 24,
      assignments: 5,
      color: 'from-purple-500 to-purple-700'
    },
    {
      id: '2',
      name: 'Physics Fundamentals',
      code: 'PHYS 201',
      teacher: 'Prof. Michael Chen',
      time: 'Tue, Thu 2:00 PM',
      students: 32,
      assignments: 3,
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: '3',
      name: 'World History',
      code: 'HIST 150',
      teacher: 'Dr. Emily Rodriguez',
      time: 'Mon, Wed 1:00 PM',
      students: 28,
      assignments: 7,
      color: 'from-green-500 to-green-700'
    },
    {
      id: '4',
      name: 'English Literature',
      code: 'ENG 200',
      teacher: 'Prof. David Wilson',
      time: 'Tue, Thu 11:00 AM',
      students: 19,
      assignments: 4,
      color: 'from-red-500 to-red-700'
    }
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 5',
      course: 'Advanced Mathematics',
      dueDate: 'Tomorrow',
      status: 'upcoming',
      type: 'assignment'
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      course: 'Physics Fundamentals',
      dueDate: '2 days',
      status: 'upcoming',
      type: 'assignment'
    },
    {
      id: '3',
      title: 'History Essay Draft',
      course: 'World History',
      dueDate: 'Overdue',
      status: 'overdue',
      type: 'assignment'
    },
    {
      id: '4',
      title: 'Literature Quiz',
      course: 'English Literature',
      dueDate: 'Next week',
      status: 'upcoming',
      type: 'quiz'
    }
  ];

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Assignment['type']) => {
    switch (type) {
      case 'assignment': return <FileText className="h-4 w-4" />;
      case 'quiz': return <Star className="h-4 w-4" />;
      case 'material': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-purple-100">You have {assignments.filter(a => a.status === 'upcoming').length} upcoming assignments</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Plus className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">Join Class</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use class code</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">Create</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Assignment</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">Calendar</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View schedule</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white">People</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Classmates</p>
          </CardContent>
        </Card>
      </div>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Courses</h2>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${course.color} rounded-lg flex items-center justify-center`}>
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{course.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{course.code}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{course.teacher}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {course.assignments} assignments
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Assignments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Assignments</h2>
          <Button variant="outline" size="sm">
            View all
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        {getTypeIcon(assignment.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={cn("text-xs", getStatusColor(assignment.status))}>
                        {assignment.dueDate}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}