import React, {ReactElement} from "react";
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {BookCategory} from "../api/book/book.model";

interface Props {
  category: BookCategory
}

const AdminBookCategoryCard = ({category}: Props): ReactElement => {
  return (
    <Card sx={{display: 'flex', flexDirection: 'column', padding: '8px'}}>
      <CardMedia
        component="img"
        sx={{width: 151}}
        image={category.imageUrl}
        alt={`${category.name} 이미지`}
      />
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CardContent sx={{flex: '1'}}>
          <Typography component="div" variant="h6">
            {category.name}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default AdminBookCategoryCard