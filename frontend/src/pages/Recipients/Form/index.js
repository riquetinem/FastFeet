import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import viaCep from '~/services/viaCep';
import { cepMask } from '~/utils/cep-mask';

import api from '~/services/api';
import history from '~/services/history';

import { Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório!'),
  cep: Yup.string()
    .required('O cep é obrigatório!')
    .min(8, 'Digite um cep válido')
    .max(9, 'Digite um cep válido'),
  rua: Yup.string().required('O nome da rua é obrigatório!'),
  numero: Yup.number('Insira o número da sua residência!').required(
    'O número da residência é obrigatório!'
  ),
  estado: Yup.string().required('O estado é obrigatório!'),
  complemento: Yup.string(),
  bairro: Yup.string().required('O bairro é obrigatório!'),
  cidade: Yup.string().required('A cidade é obrigatório!'),
});

export default function RecipientForm({ match }) {
  const { id } = match.params;

  const [recipient, setRecipient] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState([]);

  useEffect(() => {
    async function loadCep() {
      const buscar = await viaCep.get(`${cep}/json/`);

      buscar.data.rua = buscar.data.logradouro;
      buscar.data.cidade = buscar.data.localidade;
      buscar.data.estado = buscar.data.uf;

      if (id) {
        buscar.data.name = recipient.name;
        buscar.data.numero = recipient.numero;
        buscar.data.complemento = recipient.complemento;

        if (buscar.data.erro) {
          buscar.data.rua = recipient.rua;
          buscar.data.cep = recipient.cep;
          buscar.data.cidade = recipient.cidade;
          buscar.data.estado = recipient.estado;
          buscar.data.rua = recipient.rua;
          buscar.data.bairro = recipient.bairro;
        }
      }

      setEndereco(buscar.data);
    }

    loadCep();
  }, [cep, id, recipient]);

  useEffect(() => {
    async function loadRecipient() {
      if (id) {
        if (id) {
          const res = await api.get(`/recipient/${id}`);

          const { data } = res;

          setRecipient(data);
          setCep(data.cep);
        }
      }
    }

    loadRecipient();
  }, [id]);

  async function handleSubmit(data) {
    if (!id) {
      try {
        const res = await api.post('/recipient', data);
        toast.success('Destinatário cadastrado com sucesso!');
        history.push(`/edit/recipient/${res.data.id}`);
      } catch (error) {
        toast.error('Erro ao cadastrar o destinatário!');
      }
    } else {
      try {
        await api.put(`/recipient/${id}`, data);
        toast.success('Destinatário atualizado com sucesso!');
      } catch (error) {
        toast.error('Erro ao atualizar o destinatário!');
      }
    }
  }

  return (
    <Content>
      <Form initialData={endereco} onSubmit={handleSubmit} schema={schema}>
        <div id="first-row">
          <h2>{recipient ? 'Edição ' : 'Cadastro '} de destinatário</h2>

          <ul id="nav-buttons">
            <li>
              <Link to="/recipients">
                <button type="button" id="back">
                  <MdKeyboardArrowLeft size={30} color="#000" /> Voltar
                </button>
              </Link>
            </li>

            <li>
              <button type="submit">
                <MdDone size={30} color="#fff" />
                {recipient ? 'Salvar ' : 'Cadastrar '}
              </button>
            </li>
          </ul>
        </div>

        <Input name="name" label="Nome" placeholder="Nelson Jacomé" />

        <Input
          name="cep"
          label="Cep"
          placeholder="05729-120"
          id="cep"
          onChange={e => setCep(e.target.value)}
          value={cepMask(cep)}
        />

        <Input name="rua" label="Rua" id="rua" placeholder="Rua Catuti" />

        <Input name="numero" label="Número" placeholder="9999" type="number" />

        <Input name="complemento" label="Complemento" />

        <Input name="cidade" label="Cidade" placeholder="São Paulo" />

        <Input name="estado" label="Estado" placeholder="SP" />

        <Input name="bairro" label="Bairro" placeholder="Vila Andrade" />
      </Form>
    </Content>
  );
}

RecipientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
