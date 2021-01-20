import React, { Fragment } from "react";
import ProvidersRenderCards from "@components/providers/ProvidersRenderCards";
import providerDetailsService from "@services/providerDetailsService";
import { Grid, GridList, Button, Box, TextField } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Search } from "@material-ui/icons";
import Swal from "sweetalert2";
import debug from "sabio-debug";
const _logger = debug.extend("Providers");
const _loggerErr = debug.extend("ERROR");

class Providers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [],
      page: {
        pageIndex: 0,
        pageSize: 6,
        totalCount: 0,
        totalPages: 0,
      },
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    const { pageIndex, pageSize } = this.state.page;
    const params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
    providerDetailsService
      .getAll(params)
      .then(this.onGetAllSuccess)
      .catch(this.onGetAllError);
  };

  onGetAllSuccess = (res) => {
    let providers = res.item.pagedItems;
    let totalPages = res.item.totalPages;
    let totalCount = res.item.totalCount;

    _logger("-----------------------PROVIDERs FROM API", providers, res);
    const mappedProviders = providers.map(this.mapProviders);

    _logger(mappedProviders);

    this.setState((prevState) => {
      return {
        ...prevState,
        mappedProviders: mappedProviders,
        providers: providers,
        page: {
          ...prevState.page,
          totalCount: totalCount,
          totalPages: totalPages,
        },
      };
    });
  };

  onGetAllError = (err) => {
    _loggerErr(err);
  };

  onFormFieldChanged = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;

    this.setState(() => {
      let searchQuery = { ...this.state.searchQuery };
      searchQuery = newValue;
      return { searchQuery };
    });

    _logger(this.state.searchQuery);
  };

  onSearchClicked = (e) => {
    e.preventDefault();
    _logger("e", e);
    _logger("state", this.state.searchQuery);

    if (this.state.searchQuery !== "") {
      this.searchByQuery();
    } else {
      this.getAll();
    }
  };

  searchByQuery = () => {
    const { searchQuery } = this.state;
    const { pageIndex, pageSize } = this.state.page;
    const params = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      query: searchQuery,
    };
    providerDetailsService
      .search(params)
      .then(this.onGetAllSuccess)
      .catch(this.onSearchError);
  };

  onSearchError = (err) => {
    _logger(err);

    let timerInterval;
    Swal.fire({
      title: "Search could not be found",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getContent();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        _logger("I was closed by the timer");
      }
    });
  };

  pageChange = (event, page) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          page: {
            ...prevState.page,
            pageIndex: page - 1,
          },
        };
      },
      () => {
        if (this.state.searchQuery !== "") {
          this.searchByQuery();
        } else {
          this.getAll();
        }
      }
    );
  };

  mapProviders = (provider) => {
    return (
      <div key={`providerCards-${provider.id}`}>
        <ProvidersRenderCards providers={provider} {...this.props} />
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <Grid container spacing={12}>
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.onFormFieldChanged}
            placeholder="Search by First Name"
          />
          <Box pt={1} pb={1}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={this.onSearchClicked}
          >
            <Search />
          </Button>
          </Box>
          <GridList cols={2} cellHeight={"auto"} spacing={25}>
            {this.state.mappedProviders}
          </GridList>
        </Grid>
        <Grid container spacing={12} className="mt-3">
          <Grid item xs={12}>
            <div className="my-3">
              <Pagination
                count={this.state.page.totalPages}
                size="large"
                color="secondary"
                onChange={this.pageChange}
              />
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default Providers;
