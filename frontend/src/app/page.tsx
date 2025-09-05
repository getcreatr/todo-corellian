'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
	Moon, 
	Sun, 
	Bell, 
	Settings, 
	Users, 
	BarChart3, 
	TrendingUp, 
	AlertCircle,
	Mail,
	Phone,
	Search
} from 'lucide-react'

function ThemeToggle() {
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			{theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
		</Button>
	)
}

function DashboardHeader() {
	return (
		<div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 p-6 border-b">
			<div>
				<h1 className="text-3xl font-bold">Creatr Base Extended</h1>
				<p className="text-muted-foreground">Theme showcase dashboard</p>
			</div>
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-2">
					<Search className="h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search..." className="w-64" />
				</div>
				<ThemeToggle />
				<Button variant="outline" size="icon">
					<Bell className="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon">
					<Settings className="h-4 w-4" />
				</Button>
				<Avatar>
					<AvatarImage src="/placeholder-avatar.jpg" />
					<AvatarFallback>CB</AvatarFallback>
				</Avatar>
			</div>
		</div>
	)
}

function StatsCards() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Users</CardTitle>
					<Users className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">2,350</div>
					<p className="text-xs text-muted-foreground">+12% from last month</p>
					<Progress value={75} className="mt-2" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Revenue</CardTitle>
					<TrendingUp className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">$45,231</div>
					<p className="text-xs text-muted-foreground">+20% from last month</p>
					<Progress value={89} className="mt-2" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Projects</CardTitle>
					<BarChart3 className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">12</div>
					<p className="text-xs text-muted-foreground">+3 from last month</p>
					<Progress value={60} className="mt-2" />
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
					<AlertCircle className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">89%</div>
					<p className="text-xs text-muted-foreground">+5% from last month</p>
					<Progress value={89} className="mt-2" />
				</CardContent>
			</Card>
		</div>
	)
}

function ProjectsCard() {
	return (
		<Card className="col-span-2">
			<CardHeader>
				<CardTitle>Project Overview</CardTitle>
				<CardDescription>Recent activity and progress</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Website Redesign</span>
						<Badge variant="secondary">In Progress</Badge>
					</div>
					<Progress value={75} className="h-2" />
					<p className="text-xs text-muted-foreground">75% complete - Due in 3 days</p>
				</div>
				<Separator />
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Mobile App Development</span>
						<Badge variant="outline">Planning</Badge>
					</div>
					<Progress value={25} className="h-2" />
					<p className="text-xs text-muted-foreground">25% complete - Due in 2 weeks</p>
				</div>
				<Separator />
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">API Integration</span>
						<Badge>Complete</Badge>
					</div>
					<Progress value={100} className="h-2" />
					<p className="text-xs text-muted-foreground">Completed 2 days ago</p>
				</div>
				<Separator />
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">Database Migration</span>
						<Badge variant="destructive">Blocked</Badge>
					</div>
					<Progress value={0} className="h-2" />
					<p className="text-xs text-muted-foreground">Waiting for approval</p>
				</div>
			</CardContent>
		</Card>
	)
}

function TeamMembersCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Members</CardTitle>
				<CardDescription>Active collaborators</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">John Doe</p>
							<p className="text-xs text-muted-foreground">Frontend Developer</p>
						</div>
					</div>
					<Badge variant="secondary">Online</Badge>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarFallback>SM</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">Sarah Miller</p>
							<p className="text-xs text-muted-foreground">UI Designer</p>
						</div>
					</div>
					<Badge variant="outline">Away</Badge>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarFallback>MJ</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">Mike Johnson</p>
							<p className="text-xs text-muted-foreground">Backend Developer</p>
						</div>
					</div>
					<Badge variant="secondary">Online</Badge>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Avatar>
							<AvatarFallback>EB</AvatarFallback>
						</Avatar>
						<div>
							<p className="text-sm font-medium">Emily Brown</p>
							<p className="text-xs text-muted-foreground">Project Manager</p>
						</div>
					</div>
					<Badge variant="destructive">Offline</Badge>
				</div>
			</CardContent>
		</Card>
	)
}

function DashboardTabs() {
	return (
		<Tabs defaultValue="overview" className="space-y-4">
			<TabsList className="grid w-full grid-cols-4">
				<TabsTrigger value="overview">Overview</TabsTrigger>
				<TabsTrigger value="analytics">Analytics</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
				<TabsTrigger value="contacts">Contacts</TabsTrigger>
			</TabsList>
			
			<TabsContent value="overview" className="space-y-4">
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>System Update Available</AlertTitle>
					<AlertDescription>
						New features have been deployed. Check the changelog for details.
					</AlertDescription>
				</Alert>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					<ProjectsCard />
					<TeamMembersCard />
				</div>
			</TabsContent>
			
			<TabsContent value="analytics" className="space-y-4">
				<div className="grid gap-6 md:grid-cols-2">
					<Card>
						<CardHeader>
							<CardTitle>Analytics Dashboard</CardTitle>
							<CardDescription>Performance metrics and insights</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-2">
										<p className="text-sm text-muted-foreground">Page Views</p>
										<p className="text-2xl font-bold">124,832</p>
									</div>
									<div className="space-y-2">
										<p className="text-sm text-muted-foreground">Unique Visitors</p>
										<p className="text-2xl font-bold">32,144</p>
									</div>
								</div>
								<Separator />
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground">Conversion Rate</p>
									<div className="flex items-center space-x-2">
										<Progress value={68} className="flex-1" />
										<span className="text-sm font-medium">68%</span>
									</div>
								</div>
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground">Bounce Rate</p>
									<div className="flex items-center space-x-2">
										<Progress value={32} className="flex-1" />
										<span className="text-sm font-medium">32%</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Revenue Metrics</CardTitle>
							<CardDescription>Financial performance overview</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Monthly Revenue</span>
									<Badge>$45,231</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Quarterly Revenue</span>
									<Badge variant="secondary">$128,945</Badge>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-sm font-medium">Annual Revenue</span>
									<Badge variant="outline">$489,023</Badge>
								</div>
								<Separator />
								<div className="space-y-2">
									<p className="text-sm text-muted-foreground">Growth Rate</p>
									<div className="flex items-center space-x-2">
										<Progress value={85} className="flex-1" />
										<span className="text-sm font-medium">85%</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</TabsContent>
			
			<TabsContent value="settings" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Application Settings</CardTitle>
						<CardDescription>Manage your application preferences</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Email Notifications</p>
								<p className="text-sm text-muted-foreground">Receive updates via email</p>
							</div>
							<Switch />
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Push Notifications</p>
								<p className="text-sm text-muted-foreground">Get notified on your device</p>
							</div>
							<Switch />
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Analytics Tracking</p>
								<p className="text-sm text-muted-foreground">Help improve the product</p>
							</div>
							<Switch />
						</div>
						<Separator />
						<div className="space-y-2">
							<Label htmlFor="language">Language</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="en">English</SelectItem>
									<SelectItem value="es">Spanish</SelectItem>
									<SelectItem value="fr">French</SelectItem>
									<SelectItem value="de">German</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="timezone">Timezone</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Select timezone" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="utc">UTC</SelectItem>
									<SelectItem value="est">EST</SelectItem>
									<SelectItem value="pst">PST</SelectItem>
									<SelectItem value="cet">CET</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			
			<TabsContent value="contacts" className="space-y-4">
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
						<CardDescription>Manage your contact details</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input id="name" placeholder="John Doe" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<div className="flex items-center space-x-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<Input id="email" placeholder="john@example.com" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="phone">Phone</Label>
								<div className="flex items-center space-x-2">
									<Phone className="h-4 w-4 text-muted-foreground" />
									<Input id="phone" placeholder="+1 (555) 123-4567" />
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="company">Company</Label>
								<Input id="company" placeholder="Acme Corp" />
							</div>
						</div>
						<Separator />
						<div className="flex justify-end space-x-2">
							<Button variant="outline">Cancel</Button>
							<Button>Save Changes</Button>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

export default function Home() {
	return (
		<div className="min-h-screen bg-background">
			<DashboardHeader />
			<div className="container mx-auto p-6 space-y-6">
				<StatsCards />
				<DashboardTabs />
			</div>
		</div>
	)
}
