import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  CircularProgress,
  Grid,
  IconButton,
  TableSortLabel,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ForkLeft, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import { useState } from "react";

const CustomTabelCell = ({ status, data, i, n }) => (
  <TableCell
    size="small"
    sx={{
      zIndex: 0,
      position: "sticky",
      padding: `${i ===4||i ===5||i ===6||i ===7 ? "0px" : '6px 8px'}`,
      left: `${
        i === 0
          ? "0px"
          : i === 1
          ? "97px"
          : i === 2
          ? "264px"
          : i === 3
          ? "431px"
          : i === 4
          ? "510px"
          : i === 5
          ? "597px"
          : i === 6
          ? "657px"
          : "751px"
      }`,
      
      borderLeft: "1px solid black",
      outline: "1px solid black",
      outlineOffset: "-0.5px",
      outlineWidth:'thin',
      backgroundColor: `${
        status === "In Progress"
          ? "#4CAF50"
          : status === "Completed"
          ? "yellow"
          : status === "Rectification"
          ? "red"
          : i === 5
          ? "#a1d1a2"
          : i === 6
          ? "#9ba3c9"
          : "white"
      }`,
      color: `${
        status === "In Progress"
          ? "white"
          : status === "Completed"
          ? "black"
          : status === "Rectification"
          ? "white"
          : "black"
      }`,
      textAlign: "center",
      fontSize: "12px",
      whiteSpace: "nowrap",
      // overflow: "hidden",
      // textOverflow: "ellipsis",
      width: `${i===7?'80px':i===6?'40px':"auto"}`,
      tableLayout: "auto",
    }}
  >
    {i===0||i===1||i===2?<p
      //   title={i === 0 || i === 1 ? data : null}
      title={data}
      style={{
        margin: `${i===7?'0px':"0 auto"}`,
        padding: `${i > 1 ? "0px" : "auto"}`,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: `${
          i === 0
            ? "80px"
            : i === 1
            ? "150px"
            : "150px"  
        }`,
      }}
    >
      {data}
    </p>:data}
    {/* <p
      //   title={i === 0 || i === 1 ? data : null}
      title={data}
      style={{
        margin: `${i===7?'0px':"0 auto"}`,
        padding: `${i > 1 ? "0px" : "auto"}`,
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: `${
          i === 0
            ? "80px"
            : i === 1
            ? "150px"
            : i === 2
            ? "150px"
            : i === 7
            ? "80px"
            : "50px"
        }`,
      }}
    >
      {data}
    </p> */}
    {/* {data} */}
  </TableCell>
);

const CustomTabelCells = ({ status, data, i, n }) => (
  <TableCell
    size="small"
    sx={{
      zIndex: -2,
      padding: 0,
      m: 0,
      borderLeft: "1px solid black",
      backgroundColor: `${
        status === "In Progress"
          ? "#4CAF50"
          : status === "Completed"
          ? "yellow"
          : status === "Rectification"
          ? "red"
          : "white"
      }`,
      color: `${
        status === "In Progress"
          ? "white"
          : status === "Completed"
          ? "black"
          : status === "Rectification"
          ? "white"
          : "black"
      }`,
      textAlign: "center",
      fontSize: "12px",
      width: "auto",
      tableLayout: "auto",
    }}
  >
    {data}
  </TableCell>
);

const textRotateStyle = {
  transform: "rotate(-45deg)",
  transformOrigin: "50% 50%",
  WebkitTransform: "rotate(-45deg)",
  WebkitTransformOrigin: "50% 50%",
  MozTransform: "rotate(45deg)",
  MozTransformOrigin: "50% 50%",
  msTransform: "rotate(-45deg)",
  msTransformOrigin: "50% 50%",
  OTransform: "rotate(-45deg)",
  OTransformOrigin: "50% 50%",
};

export default function LaborTable({ laborData, setLaborData }) {
  const [sorting, setSorting] = React.useState("All");
  const [searchProject, setSearchProject] = React.useState("");
  const [inputField, setInputField] = useState("");
  const [order, setOrder] = useState("dsc");
  // const [click,setClick]=useState('')
  var rowData = [];
  const [sortData, setSortData] = useState([]);

  if (laborData.length === 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={70} />
      </Box>
    );
  }

  const PaintersNeeded = [
    "Donny",
    "Troy",
    "Christine",
    "William",
    "John",
    "Farhad",
    "Michael",
    "Muhammad",
    "Keith",
    "Joban",
    "Andy",
    "Daniel",
  ];
  // console.log(laborData);

  const handleRequestSort = (d) => {
    const newData = [];
    console.log(d);
    if (d === "dsc") {
      setOrder("asc");
      newData = laborData.sort(
        (a, b) =>
          Date.parse(new Date(a.Date.split("/").reverse().join("-"))) -
          Date.parse(new Date(b.Date.split("/").reverse().join("-")))
      );
    } else if (d === "asc") {
      setOrder("dsc");
      newData = laborData.sort(
        (a, b) =>
          Date.parse(new Date(b.Date.split("/").reverse().join("-"))) -
          Date.parse(new Date(a.Date.split("/").reverse().join("-")))
      );
    }

    setSortData(newData);
  };

  laborData.forEach((row) => {
    const labours = JSON.parse(row.labor_board_contractors_data);
    // console.log(row);

    const outsider = [];

    const track = [];

    const insider = [];

    PaintersNeeded.map((name, index) => {
      labours.map((item) => {
        if (item.Contractor_First_Name === name) {
          insider.push(item);
        } else {
          if (
            PaintersNeeded.includes(item.Contractor_First_Name) === false &&
            track.includes(item.Contractor_First_Name) !== true
          ) {
            track.push(item.Contractor_First_Name);
            outsider.push(item);
          }
        }
      });
    });
    const finalArray = insider.concat(outsider);

    rowData.push({
      Client: row.Client,
      Sale_Date: row.Date,
      Name: row.Name,
      summary: row.Project_Summary,
      office_budget: row.office_budget,
      asses: row.asses,
      wip: row.wip,
      labor_board_contractors_data: finalArray,
      status: row.Project_Status,
    });
  });

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChange = (data) => {
    console.log(data);
    setSearchProject(data);
  };

  const handleTab = () => {
    setInputField("");
  };

  return (
    <TableContainer
      sx={{
        width: "100%",
        height: "100vh",
        border: "1px solid black",
      }}
    >
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow
            style={{
              position: "sticky",
              left: 0,
              zIndex: 2,
              top: 0,
              backgroundColor: "#fff",
              // borderBottom: "1px solid black",
            }}
          >
            <TableCell
              colSpan="5"
              sx={{
                zIndex: 2,
                position: "sticky",
                left: "0px",
                backgroundColor: "#3f51b5",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "25px",
                color: "#fff",
                padding: "35px 0px",
                pb: "20px",
                outline: "1px solid black",
                outlineOffset: "-0.5px",
              }}
            >
              Project Labour Board
              <TextField
                sx={{
                  borderRadius: 20,
                  display: "flex",
                  m: "30px",
                  borderColor: "white",
                  marginBottom: "0px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px ",
                    height: "37px ",
                    borderColor: "white",
                    backgroundColor: "#838ecc",
                    color: "white",
                  },
                }}
                // label="Search..."
                placeholder="Search Project"
                size="small"
                id="fullWidth"
                // value={inputField}
                onChange={(e) => handleChange(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => handleTab()} size="small">
                      <SearchOutlined
                        fontSize="small"
                        sx={{ color: "white" }}
                      />
                    </IconButton>
                  ),
                }}
              />
            </TableCell>
            <TableCell
              sx={{
                zIndex: 2,
                left: "597px",
                position: "sticky",
                // borderLeft: "1px solid black",
                outline: "1px solid black",
                outlineOffset: "-0.5px",
                backgroundColor: "#3f51b5",
              }}
            />
            {["Painters", "Status"].map((title, index) => (
              <TableCell
                key={index}
                sx={{
                  zIndex: 2,
                  left: `${
                    index === 0 ? "657px" : index === 1 ? "751px" : null
                  }`,
                  position: "sticky",
                  // borderLeft: "1px solid black",
                  outline: "1px solid black",
                  outlineOffset: "-0.5px",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                }}
              >
                {title}
                {title === "Status" && (
                  <select onChange={(e) => setSorting(e.target.value)}>
                    <option>All</option>
                    <option>Requested</option>
                    <option>In Progress</option>
                    <option>Rectification</option>
                    <option>Completed</option>
                  </select>
                )}
              </TableCell>
            ))}

            {rowData[0].labor_board_contractors_data?.map((painter, index) => (
              <TableCell
                colSpan="2"
                sx={{
                  // position:"relative",
                  zIndex: 1,
                  borderLeft: "1px solid black",
                  // outline: "1px solid black",
                  // outlineOffset: "-0.5px",
                  textAlign: "center",
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  width: "100px",
                }}
                key={index}
              >
                <p style={textRotateStyle}>{painter.Contractor_First_Name}</p>
              </TableCell>
            ))}
          </TableRow>
          <TableRow
            sx={{
              position: "sticky",
              left: 0,
              zIndex: 1,
              top: 146.5,
              backgroundColor: "#fff",
              borderBottom: "1px solid black",
            }}
          >
            {[
              "Sale Date",
              "Project",
              "Project summary",
              "Office Budget",
              "Asseses",
              "WIP",
              "To Complete",
              "",
            ].map((label, index) => (
              <TableCell
                key={index}
                sx={{
                  display:`${index===0?'flex':null}`,
                  flexWrap:`${index===0?'wrap':null}`,
                  position: "sticky",
                  zIndex: 2,
                  left: `${
                    index === 0
                      ? "0px"
                      : index === 1
                      ? "97px"
                      : index === 2
                      ? "264px"
                      : index === 3
                      ? "431px"
                      : index === 4
                      ? "510px"
                      : index === 5
                      ? "597px"
                      : index === 6
                      ? "657px"
                      : "751px"
                  }`,
                  borderLeft: `${index===7?'none':"1px solid black"}`,
                  outline: "1px solid black",
                  outlineOffset: "-0.5px",
                  outlineWidth:'thin',
                  textAlign: "center",
                  backgroundColor:
                    index === 5
                      ? "#a1d1a2"
                      : index === 6
                      ? "#9ba3c9"
                      : "#ECEEF8",
                  color: index === 5 || index === 6 ? "white" : "inherit",
                  // height:`${index===0?'66px':'auto'}`,
                  pb:`${index ===0?'10px':null}`,
                  borderBottom:`${index===0?'1px solid black':null}`
                }}
              >
                {index === 0 ? (
                  <TableSortLabel
                    onClick={
                      order === "dsc"
                        ? () => handleRequestSort("dsc")
                        : () => handleRequestSort("asc")
                    }
                    active={true}
                    direction={order === "dsc" ? "desc" : "asc"}
                    sx={{mt:2,p:0,display:"inline",justifyContent:'center',width:'30%',alignItems:'center'}}
                  >
                    {/* <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box> */}
                  </TableSortLabel>
                ) : null}
                <Box sx={{width:'65%'}}>
                {label}
                </Box>
              </TableCell>
            ))}
            {rowData[0].labor_board_contractors_data?.map((painter) => (
              <>
                <TableCell
                  sx={{
                    zIndex: 1,
                    textAlign: "center",
                    // borderLeft: "1px solid black",
                    outline: "1px solid black",
                    outlineOffset: "0px",
                    fontWeight: 600,
                    backgroundColor: "#ECEEF8",
                    width: "49px",
                    padding: 0.5,
                  }}
                >
                  <p style={textRotateStyle}>Past</p>
                </TableCell>
                <TableCell
                  sx={{
                    zIndex: 1,
                    textAlign: "center",
                    // borderLeft: "1px solid black",
                    // borderTop:'1px solid black',
                    outline: "1px solid black",
                    outlineOffset: "0px",
                    outlineWidth:'thin',
                    fontWeight: 600,
                    backgroundColor: "#ECEEF8",
                    color: "#4CAF50",
                    width: "49px",
                    padding: 0.5,
                  }}
                >
                  <p style={textRotateStyle}>Due</p>
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rowData
            .filter((row) => sorting === "All" || row.status === sorting)
            .filter((item) => {
              return searchProject.toLowerCase() === ""
                ? item
                : item.Name.toLowerCase().includes(searchProject);
            })
            .map((row, id) => (
              <TableRow key={id}>
                {[
                  row.Sale_Date,
                  row.Name,
                  row.summary,
                  row.office_budget,
                  row.asses,
                  row.wip,
                  "",
                  row.status,
                ].map((data, index) => (
                  <CustomTabelCell
                    i={index}
                    key={index}
                    status={row.status}
                    data={data}
                  />
                ))}
                {/* {console.log(row)} */}
                {row.labor_board_contractors_data.map((item, index) => (
                  <React.Fragment key={index}>
                    <CustomTabelCells
                      status={row.status}
                      data={
                        item.Total_Invoiced !== 0 ? item.Total_Invoiced : ""
                      }
                    />
                    <CustomTabelCells
                      status={row.status}
                      data={
                        item.This_Week_Invoiced_Hour !== 0
                          ? item.This_Week_Invoiced_Hour
                          : ""
                      }
                    />
                  </React.Fragment>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
