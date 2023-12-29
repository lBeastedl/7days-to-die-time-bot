import { ActivityType, PresenceStatusData } from 'discord.js'
import { DayTime } from './service/telnet.js'

export class Presence {

	public afk: boolean
	public status: PresenceStatusData
	public activity: {
		name: string;
		state: string;
		type: ActivityType;
		timestamp: { start: number; end: number }
	}

	constructor(dayTime: DayTime, online: number, activityStart: number, activityInterval: number) {
		const icon = dayTime.isHordNight ? '💀' : '🕊️'
		const timestamp = `Day ${dayTime.day}, ${dayTime.time}`
		let state

		if (online < 1) {
			this.afk = true
			this.status = 'idle'
			state = `${icon} Paused at ${timestamp}`
		} else {
			this.afk = false
			this.status = 'online'
			state = `${icon} ${timestamp}. Online: ${online}`
		}

		this.activity = {
			name: '7 Days to Die',
			type: ActivityType.Custom,
			state: state,
			timestamp: {
				start: activityStart,
				end: Date.now() + activityInterval,
			},
		}
	}
}
