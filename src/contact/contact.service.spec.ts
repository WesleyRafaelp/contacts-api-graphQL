import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { ContactRepositoryStub } from '../test/stubs/contact-repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { UpdateContactInput } from './dto/update-contact.input';

describe('ContactService', () => {
  let contactService: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: getRepositoryToken(Contact), // Use o nome do provedor do repositório no módulo real
          useClass: ContactRepositoryStub, // Use o stub aqui
        },
      ],
    }).compile();

    contactService = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(contactService).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um contato salvo', async () => {
      const contact: CreateContactInput = {
        email: 'newEmail@email.com',
        nickname: 'name',
        phone: '0000000000',
      };
      const createContact = await contactService.create(contact);

      expect(createContact).toMatchObject(contact);
    });

    it('Deve retornar um erro dizendo que o email já foi cadastrado', async () => {
      const createContactInput: CreateContactInput = {
        email: 'existing@email.com',
        nickname: 'name',
        phone: '0000000000',
      };
      try {
        await contactService.create(createContactInput);

        fail('A função create não lançou um erro de conflito.');
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email já cadastrado');
      }
    });
  });

  describe('findAll', () => {
    it('Deve retornar uma lista de contatos', async () => {
      const contactList = await contactService.findAll();

      expect(contactList).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um contato', async () => {
      const contact: Contact = {
        id: 1,
        nickname: 'test',
        email: 'existing@email.com',
        phone: '(00) 00000-0000',
      };
      const findOneContact = await contactService.findOne(contact.id);

      expect(findOneContact).toMatchObject(contact);
    });
  });

  describe('update', () => {
    it('Deve atualizar um contato e retornar uma string', async () => {
      const contact: UpdateContactInput = {
        id: 1,
        email: 'updateEmail@email.com',
        nickname: 'updateName',
        phone: '0000000000',
      };
      const updateContact = await contactService.update(contact.id, contact);

      expect(updateContact).toBe('update sucess');
    });

    it('Deve retornar um erro que o contato não existe', async () => {
      const contact: UpdateContactInput = {
        id: 2,
        email: 'existing@email.com',
        nickname: 'name',
        phone: '0000000000',
      };
      try {
        await contactService.update(contact.id, contact);

        fail('A função update não lançou um erro de conflito.');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Contato não existe');
      }
    });

    it('Deve retornar um erro com uma messagem que o email já foi cadastrado', async () => {
      const contact: UpdateContactInput = {
        id: 1,
        email: 'existing@email.com',
        nickname: 'name',
        phone: '0000000000',
      };
      try {
        await contactService.update(contact.id, contact);

        fail('A função update não lançou um erro de conflito.');
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Email já cadastrado');
      }
    });
  });

  describe('remove', () => {
    it('Deve retornar uma string', async () => {
      const contact = {
        id: 1,
        email: 'updateEmail@email.com',
        nickname: 'updateName',
        phone: '0000000000',
      };
      const updateContact = await contactService.remove(contact.id);

      expect(updateContact).toBe('Remove Sucess');
    });

    it('Deve retornar um erro que o contato não existe', async () => {
      const contact = {
        id: 2,
        email: 'existing@email.com',
        nickname: 'name',
        phone: '0000000000',
      };
      try {
        await contactService.remove(contact.id);

        fail('A função remove não lançou um erro de conflito.');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          `Contato com ID ${contact.id} não encontrado.`,
        );
      }
    });
  });
});
