import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'userAutonym',
})
export class UserAutonymPipe implements PipeTransform {
    transform(value: string, ...args) {
        let name: string;

        switch (value) {
            case '0':
                name = '未实名';
                break;
            case '1':
                name = '已实名';
                break;

            default:
                name = '已停用';
                break;
        }
        return name;
    }
}
