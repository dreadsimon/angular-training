interface UserItem {
	id: number;
	name: string;
	surname: string;
	login: string;
	password: string;
	active: boolean
}

class User implements UserItem {
	public id: number;
	public name: string;
	public surname: string;
	public login: string;
	public password: string;
	public active: boolean;

	constructor(id: number, name: string, surname: string, login: string, password: string, active: boolean) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.login = login;
		this.password = password;
		this.active = active;
	}
}

export {User};