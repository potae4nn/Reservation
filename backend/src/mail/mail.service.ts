import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateBorrowEquipDto } from '../borrow-equip/dto/create-borrow-equip.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async create(createMailDto: any) {
    try {
      await this.mailerService.sendMail({
        to: createMailDto.member?.email,
        from: '"SHC Mail" <potae4nn@gmail.com>',
        subject: 'แบบฟอร์มยืมอุปกรณ์กีฬา ' + createMailDto.member?.fullname,
        template: 'index',
        context: {
          member: createMailDto?.member,
          borrow: createMailDto?.borrow
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
