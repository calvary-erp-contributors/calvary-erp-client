import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISalesReceiptEmailPersona } from 'app/shared/model/sales-receipt-email-persona.model';
import { searchEntities, getEntities } from './sales-receipt-email-persona.reducer';

export const SalesReceiptEmailPersona = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const salesReceiptEmailPersonaList = useAppSelector(state => state.salesReceiptEmailPersona.entities);
  const loading = useAppSelector(state => state.salesReceiptEmailPersona.loading);
  const totalItems = useAppSelector(state => state.salesReceiptEmailPersona.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="sales-receipt-email-persona-heading" data-cy="SalesReceiptEmailPersonaHeading">
        Sales Receipt Email Personas
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/sales-receipt-email-persona/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Sales Receipt Email Persona
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {salesReceiptEmailPersonaList && salesReceiptEmailPersonaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('emailIdentifier')}>
                  Email Identifier <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mainEmail')}>
                  Main Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('clearCopyEmail')}>
                  Clear Copy Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('blindCopyEmail')}>
                  Blind Copy Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('languageKeyCode')}>
                  Language Key Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredGreeting')}>
                  Preferred Greeting <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredGreetingDesignation')}>
                  Preferred Greeting Designation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredPrefix')}>
                  Preferred Prefix <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredSuffix')}>
                  Preferred Suffix <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('timeBasedGreetings')}>
                  Time Based Greetings <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sloganBasedGreeting')}>
                  Slogan Based Greeting <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addPrefix')}>
                  Add Prefix <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addSuffix')}>
                  Add Suffix <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredSignature')}>
                  Preferred Signature <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredSignatureDesignation')}>
                  Preferred Signature Designation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('includeServiceDetails')}>
                  Include Service Details <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('includeMessageOfTheDay')}>
                  Include Message Of The Day <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('includeTreasuryQuote')}>
                  Include Treasury Quote <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  Created At <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifedAt')}>
                  Last Modifed At <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Created By <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Last Modified By <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Contributor <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {salesReceiptEmailPersonaList.map((salesReceiptEmailPersona, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/sales-receipt-email-persona/${salesReceiptEmailPersona.id}`} color="link" size="sm">
                      {salesReceiptEmailPersona.id}
                    </Button>
                  </td>
                  <td>{salesReceiptEmailPersona.emailIdentifier}</td>
                  <td>{salesReceiptEmailPersona.mainEmail}</td>
                  <td>{salesReceiptEmailPersona.clearCopyEmail ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.blindCopyEmail ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.languageKeyCode}</td>
                  <td>{salesReceiptEmailPersona.preferredGreeting}</td>
                  <td>{salesReceiptEmailPersona.preferredGreetingDesignation}</td>
                  <td>{salesReceiptEmailPersona.preferredPrefix}</td>
                  <td>{salesReceiptEmailPersona.preferredSuffix}</td>
                  <td>{salesReceiptEmailPersona.timeBasedGreetings ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.sloganBasedGreeting ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.addPrefix ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.addSuffix ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.preferredSignature}</td>
                  <td>{salesReceiptEmailPersona.preferredSignatureDesignation}</td>
                  <td>{salesReceiptEmailPersona.includeServiceDetails ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.includeMessageOfTheDay ? 'true' : 'false'}</td>
                  <td>{salesReceiptEmailPersona.includeTreasuryQuote ? 'true' : 'false'}</td>
                  <td>
                    {salesReceiptEmailPersona.createdAt ? (
                      <TextFormat type="date" value={salesReceiptEmailPersona.createdAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {salesReceiptEmailPersona.lastModifedAt ? (
                      <TextFormat type="date" value={salesReceiptEmailPersona.lastModifedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {salesReceiptEmailPersona.createdBy ? (
                      <Link to={`/application-user/${salesReceiptEmailPersona.createdBy.id}`}>
                        {salesReceiptEmailPersona.createdBy.applicationIdentity}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {salesReceiptEmailPersona.lastModifiedBy ? (
                      <Link to={`/application-user/${salesReceiptEmailPersona.lastModifiedBy.id}`}>
                        {salesReceiptEmailPersona.lastModifiedBy.applicationIdentity}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {salesReceiptEmailPersona.contributor ? (
                      <Link to={`/dealer/${salesReceiptEmailPersona.contributor.id}`}>{salesReceiptEmailPersona.contributor.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/sales-receipt-email-persona/${salesReceiptEmailPersona.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/sales-receipt-email-persona/${salesReceiptEmailPersona.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/sales-receipt-email-persona/${salesReceiptEmailPersona.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Sales Receipt Email Personas found</div>
        )}
      </div>
      {totalItems ? (
        <div className={salesReceiptEmailPersonaList && salesReceiptEmailPersonaList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SalesReceiptEmailPersona;
