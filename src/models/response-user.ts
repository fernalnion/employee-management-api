import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ROLES } from 'src/enums/role.enum';
import { User } from 'src/interfaces/user.interface';

export class UserEntity implements User {
    @ApiPropertyOptional({ type: String })
    _id?: string;

    @ApiProperty({ type: String })
    email: string = '';

    @ApiProperty({ type: String })
    firstname: string = '';

    @ApiProperty({ type: String })
    lastname: string = '';

    @ApiProperty({ type: String })
    @Exclude({ toPlainOnly: true })
    password: string = '';

    @ApiProperty({ type: String, enum: ROLES })
    role: ROLES = ROLES.USER;

    @ApiProperty({ type: String })
    mobile: string = '';

    @ApiProperty({ type: Number })
    dob: number = 0;

    @ApiPropertyOptional({ type: String })
    @Exclude({toPlainOnly: true})
    refreshToken?: string | null;

    constructor(partial: Partial<UserEntity>) {
        this._id = partial._id?.toString();
        this.email = partial.email!;
        this.password = partial.password!;
        this.firstname = partial.firstname!;
        this.lastname = partial.lastname!;
        this.role = partial.role!;
        this.mobile = partial.mobile!;
        this.dob = partial.dob!;
        this.refreshToken = partial.refreshToken!;
    }
}
