# Swagger OpenAI 

The SwaggerModule searches for all @Body(), @Query(), and @Param() decorators in route handlers to generate the API document. It also creates corresponding model definitions by taking advantage of reflection. Consider the following code:

```
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```
HINT
To explicitly set the body definition use the @ApiBody() decorator (imported from the @nestjs/swagger package).

# Basic Setup

