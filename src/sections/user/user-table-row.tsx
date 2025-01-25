import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ViewUserDialog, EditUserDialog, DeleteUserDialog } from '../../layouts/components/viewedit';
// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  class: string;
  section: string;
  RollNo: string;
};

export type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onUserUpdate: () => void;
};

export function UserTableRow({ row, selected, onSelectRow,onUserUpdate }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar alt={row.name} src={row.avatarUrl} /> */}
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.class}</TableCell>

        <TableCell>{row.section}</TableCell>

        <TableCell>{row.RollNo}</TableCell>

        

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={() => {
            handleClosePopover();
            setViewDialogOpen(true);
          }}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
          <MenuItem onClick={() => {
            handleClosePopover();
            setEditDialogOpen(true);
          }}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem 
            onClick={() => {
              handleClosePopover();
              setDeleteDialogOpen(true);
            }} 
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
      <ViewUserDialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)} 
        user={row} 
      />
      <EditUserDialog 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        user={row} 
        onUpdate={onUserUpdate}
      />
      <DeleteUserDialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        user={row} 
        onDelete={onUserUpdate}
      />
    </>
  );
}
