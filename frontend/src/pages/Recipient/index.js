import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import viaCep from '~/services/viaCep';

import * as RecipientsActions from '~/store/modules/recipients/actions';

import api from '~/services/api';

import { Container, Content } from './styles';

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

export default function Recipient({ match }) {
  const { id } = match.params;

  const [recipient, setRecipient] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCep() {
      const buscar = await viaCep.get(`${cep}/json/`);
      console.tron.log(buscar.data);

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
      dispatch(RecipientsActions.addRequest(data));
    } else {
      data.id = id;
      dispatch(RecipientsActions.updateRequest(data));
    }
  }

  return (
    <Container>
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

          <strong>Nome</strong>
          <Input name="name" placeholder="Nelson Jacomé" />

          <strong id="cep">Cep</strong>
          <Input
            name="cep"
            placeholder="00000-000"
            onChange={e => setCep(e.target.value)}
          />

          <strong id="rua">Rua</strong>
          <Input name="rua" placeholder="Rua Astrolopiteco" />

          <strong id="numero">Número</strong>
          <Input name="numero" placeholder="9999" type="number" />

          <strong id="complemento">Complemento</strong>
          <Input name="complemento" />

          <strong>Cidade</strong>
          <Input name="cidade" placeholder="São Paulo" />

          <strong>Estado</strong>
          <Input name="estado" placeholder="SP" />

          <strong>Bairro</strong>
          <Input name="bairro" placeholder="Crécil" />
        </Form>
      </Content>
    </Container>
  );
}

Recipient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
