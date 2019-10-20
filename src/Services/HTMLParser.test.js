import HTMLParser from './HTMLParser';

jest.mock('uuid/v4', () => () => 'uuid');

describe('HTMLParser', () => {
  it('should do things', () => {
    const template = `
    <table>
	<tbody><tr>
		<td>
			<img src="https://suilabs.s3.eu-west-3.amazonaws.com/firmas/SG_tomas.jpg">
		</td>
	</tr>
	<tr>
		<td>
			<a href="mailto:tomas.guinovart@renalyse.com" style="text-decoration: none; color: #DF6546; font-family: Roboto, Verdana, Sans-serif; font-size: 1rem;">
				tomas.guinovart@renalyse.com
			</a>
		</td>
	</tr>
	<tr>
		<td>
			<a style="text-decoration: none; color: #DF6546; font-family: Roboto, Verdana, Sans-serif; font-size: 1rem;" href="http://www.renalyse.com">
				www.renalyse.com
			</a>
		</td>
	</tr>
</tbody></table>
`;
    const parser = new HTMLParser({
      "a": {
        "id": "title",
        "params": [
          "href",
          "inneHtml"
        ]
      },
      "img": {
        "id": "alt",
        "params": [
          "src"
        ]
      }
    });
    parser.parseContent(template);
  });
});