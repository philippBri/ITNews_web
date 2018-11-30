import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../../models/user.model';
import {map} from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class UserService {

    private userUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) {
    }

    public getUsers() {
        return this.http.get<User[]>(this.userUrl + '/userList').pipe(map(
            (response: User[]) => {
                console.log(response);
                return response;
            }));
    }

    public getUsernameById(id) {
        return this.http.get<string>(this.userUrl + '/userId', id);
    }

    public deleteUser(user) {
        return this.http.delete(this.userUrl + '/userList/' + user.id).pipe(map(
            (data: User) => {
                console.log('News with id = ' + data.id + 'and username = ' + data.username + 'was deleted!');
                return data;
            }
        ));
    }

    public blockUser(user) {
        return this.http.post<User>(this.userUrl + '/userBlock', user.id);
    }

    public signUp(user) {
        return this.http.post<User>(this.userUrl + '/signup', user);
    }

    public isUserExist(username: string) {
        return this.http.post<boolean>(this.userUrl + '/userCheck', username);
    }

    public getUserInfo(token: string) {
        return this.http.post<User>(this.userUrl + '/token/getUserInfo', token);
    }


    public getPublicUserInfo(userId) {
        return this.http.get<User>(this.userUrl + '/getPublicUserInfo/' + userId);

    }


    public updateUserProfile(user) {
        return this.http.post<User>(this.userUrl + '/updateProfile', user);
    }

}
