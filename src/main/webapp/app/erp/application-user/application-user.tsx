import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { searchEntities, getEntities, reset } from './application-user.reducer';

export const ApplicationUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const [sorting, setSorting] = useState(false);

  const applicationUserList = useAppSelector(state => state.applicationUser.entities);
  const loading = useAppSelector(state => state.applicationUser.loading);
  const totalItems = useAppSelector(state => state.applicationUser.totalItems);
  const links = useAppSelector(state => state.applicationUser.links);
  const entity = useAppSelector(state => state.applicationUser.entity);
  const updateSuccess = useAppSelector(state => state.applicationUser.updateSuccess);

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

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  const startSearching = e => {
    if (search) {
      dispatch(reset());
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
    dispatch(reset());
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting, search]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  return (
    <div>
      <h2 id="application-user-heading" data-cy="ApplicationUserHeading">
        Application Users
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/application-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Application User
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
        <InfiniteScroll
          dataLength={applicationUserList ? applicationUserList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {applicationUserList && applicationUserList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('applicationIdentity')}>
                    Application Identity <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('lastLoginTime')}>
                    Last Login Time <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('timeOfCreation')}>
                    Time Of Creation <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('lastTimeOfModification')}>
                    Last Time Of Modification <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('userIdentifier')}>
                    User Identifier <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Created By <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Last Modified By <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    System Identity <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {applicationUserList.map((applicationUser, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/application-user/${applicationUser.id}`} color="link" size="sm">
                        {applicationUser.id}
                      </Button>
                    </td>
                    <td>{applicationUser.applicationIdentity}</td>
                    <td>
                      {applicationUser.lastLoginTime ? (
                        <TextFormat type="date" value={applicationUser.lastLoginTime} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>
                      {applicationUser.timeOfCreation ? (
                        <TextFormat type="date" value={applicationUser.timeOfCreation} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>
                      {applicationUser.lastTimeOfModification ? (
                        <TextFormat type="date" value={applicationUser.lastTimeOfModification} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>{applicationUser.userIdentifier}</td>
                    <td>
                      {applicationUser.createdBy ? (
                        <Link to={`/application-user/${applicationUser.createdBy.id}`}>
                          {applicationUser.createdBy.applicationIdentity}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {applicationUser.lastModifiedBy ? (
                        <Link to={`/application-user/${applicationUser.lastModifiedBy.id}`}>
                          {applicationUser.lastModifiedBy.applicationIdentity}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{applicationUser.systemIdentity ? applicationUser.systemIdentity.login : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button
                          tag={Link}
                          to={`/application-user/${applicationUser.id}`}
                          color="info"
                          size="sm"
                          data-cy="entityDetailsButton"
                        >
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/application-user/${applicationUser.id}/edit`}
                          color="primary"
                          size="sm"
                          data-cy="entityEditButton"
                        >
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button
                          tag={Link}
                          to={`/application-user/${applicationUser.id}/delete`}
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
            !loading && <div className="alert alert-warning">No Application Users found</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ApplicationUser;
