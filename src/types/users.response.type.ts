interface IUsersName {
	title: string;
	first: string;
	last: string;
}

interface IUsersPicture {
	large: string;
	medium: string;
	thumbnail: string;
}

export interface ILogin {
	uuid: string
	username: string
}

export interface IResult {
	gender: string;
	name: IUsersName;
	email: string;
	picture: IUsersPicture;
	login: ILogin
}

interface IInfo {
	page: number;
}

export interface IUsersResponseType {
	info: IInfo;
	results: IResult[];
}
