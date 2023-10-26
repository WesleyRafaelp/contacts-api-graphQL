import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}
  async create(createContactInput: CreateContactInput) {
    const contact = await this.contactRepository.findOne({
      where: {
        email: createContactInput.email,
      },
    });

    if (contact) throw new ConflictException('Email já cadastrado');

    const savedContact = await this.contactRepository.save(createContactInput);

    return savedContact;
  }

  async findAll() {
    return await this.contactRepository.find();
  }

  async findOne(id: number) {
    return await this.contactRepository.findOneBy({ id: id });
  }

  async update(id: number, updateContactInput: UpdateContactInput) {
    const contact = await this.contactRepository.findOneBy({ id: id });

    if (!contact) throw new BadRequestException('Contato não existe');

    if (updateContactInput.email !== undefined || null) {
      const emailExisted = await this.contactRepository.findOneBy({
        email: updateContactInput.email,
      });

      if (emailExisted) throw new ConflictException('Email já cadastrado');
    }

    await this.contactRepository.update(id, updateContactInput);

    return 'update sucess';
  }

  async remove(id: number) {
    const contactToRemove = await this.contactRepository.findOneBy({ id: id });

    if (!contactToRemove) {
      throw new BadRequestException(`Contato com ID ${id} não encontrado.`);
    }
    await this.contactRepository.remove(contactToRemove);
    return 'Remove Sucess';
  }
}
