import { Request, Response } from "express";

interface RouterRun {
	// eslint-disable-next-line no-unused-vars
	(req: Request, res: Response): Promise<any>
}

export default interface RouterExport {
	name: string
	description: string
	parameters: string[]
	run: RouterRun
// eslint-disable-next-line semi
}